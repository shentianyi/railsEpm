class DepartmentService

  # create department
  # requires
  #  department: hash
  #     name: string, requires
  #     description: string, optional
  #     parent_id: integer, optional
  #  user: object, required
  def self.create_department department, user
    Department.transaction do

      parent=nil
      unless department[:parent_id].blank?
        result=check_user_manageable(user,department[:parent_id])
        if result.is_a?(Department)
          parent=result
        else
          return result
        end
      end

      department=Department.new(department.except(:parent_id))
      department.creator=user
      department.tenant=user.tenant
      # parent=user.tenant.departments.find_by_id(department[:parent_id]) if department[:parent_id].blank?
      department.parent=parent if parent
      # set user as manager and add user to the user departments
      ud=department.user_departments.build(is_manager: true)
      ud.department=department
      user.user_departments<<ud
      if department.save
        DepartmentPresenter.new(department).as_basic_feedback(['Department Create Success'], 1)
      else
        DepartmentPresenter.new(department).as_basic_feedback(department.errors.full_messages)
      end
    end
  end

# update department
# requires
#  department: hash
#     name: string, requires
#     description: string, optional
#     id: integer, optional
#  user: object, required
  def self.update_department(params, user)
    begin
      Department.transaction do
        check_user_manageable(user, params[:id]) do |user, department|
          if department.update_attributes(params.except(:id))
            ApiMessage.new(messages: ['Department Update Success'], result_code: 1)
          else
            ApiMessage.new(messages: department.errors.full_messages)
          end
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.delete_department(id, user)
    begin
      Department.transaction do
        check_user_manageable(user, id) do |user, department|
          if department.destroy
            ApiMessage.new(messages: ['Department Delete Success'], result_code: 1)
          else
            ApiMessage.new(messages: ['Department Delete Fail'])
          end
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

# get department members
# requires
# id:integer,requires
  def self.members(id, user)
    begin
      Department.transaction do
        if department=get_department(user, id)
          UserDepartmentPresenter.as_department_users(department.user_departments.joins(:user))
        else
          ApiMessage.new(messages: ['Department not found'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

# add users to department, and invite unreg users
# requires
#  emails: array
#  id: integer, department id
#  user: object, who add
  def self.add_department_users(emails, id, user)
    begin
      UserDepartment.transaction do
        check_user_manageable(user, id) do |user, department|
          users=user.tenant.users.where(email: emails).all
          users.each do |user|
            unless user.user_departments.where(department_id: id).first
              ud=user.user_departments.build
              ud.department=department
              ud.save
            end
          end

          # invite unreg users
          reg_emails=users.collect { |u| u.email }
          emails.reject { |x| reg_emails.include?(x) }.uniq.each do |email|
            user.user_invites.create(department_id: id, email: email) unless UserInvite.find_by_email(email)
          end
          ApiMessage.new(messages: ['Users added or invited'], result_code: 1)
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

# add user to department
# requires
#  user_id: integer
#  id: integer, department id
#  user: object, who add
  def self.add_department_user(user_id, id, user)
    begin
      UserDepartment.transaction do
        check_user_manageable(user, id) do |user, department|
          if (add_user=user.tenant.users.find_by_id(user_id))
            if add_user.user_departments.where(department_id: id).first
              ApiMessage.new(messages: ['User has been added to Department'])
            else
              ud=add_user.user_departments.build
              ud.department=department
              if ud.save
                ApiMessage.new(messages: ['User added to Department'], result_code: 1)
              else
                ApiMessage.new(messages: ud.errors.full_messages)
              end
            end
          else
            ApiMessage.new(messages: ['User to be added not found'])
          end
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

# remove user from department
# requires
# user_id:integer,requires
# id: integer, requires, department id
  def self.remove_user(user_id, id, user)
    user_manager(user_id, id, user) { |ud|
      if ud.destroy
        ApiMessage.new(messages: ['Remove User Success'], result_code: 1)
      else
        ApiMessage.new(messages: ['Remove User Error'])
      end
    }
  end

# set user add department manager
# requires
# user_id:integer,requires
# id: integer, requires, department id
  def self.set_manager(user_id, id, user)
    user_manager(user_id, id, user) { |ud|
      if ud.update_attributes(is_manager: true)
        ApiMessage.new(messages: ['Set Manager Success'], result_code: 1)
      else
        ApiMessage.new(messages: ['Set Manager Error'])
      end
    }
  end


# remove user from department manager
# requires
# user_id:integer,requires
# id: integer, requires, department id
  def self.remove_manager(user_id, id, user)
    user_manager(user_id, id, user) { |ud|
      if ud.is_manager
        if ud.update_attributes(is_manager: false)
          ApiMessage.new(messages: ['Unset Manager Success'], result_code: 1)
        else
          ApiMessage.new(messages: ['Set Manager Error'])
        end
      else
        ApiMessage.new(messages: ['User is not Manager can not Unset'])
      end
    }
  end

# get user departments
# user: object, requires
# department_id: integer, optional
  def self.user_departments(user, department_id=nil)
    # get root departments
    if department_id.blank?
      DepartmentPresenter.as_user_departments(user.root_departments, user)
    else
      if department=get_department(user, department_id)
        if department.access_childreable(user)
          DepartmentPresenter.as_user_departments(department.children, user)
        else
          ApiMessage.new(messages: ['Department You cannot access'])
        end
      else
        ApiMessage.new(messages: ['Department not found'])
      end
    end
  end

  private
  def self.user_manager(user_id, id, user)
    begin
      UserDepartment.transaction do
        check_user_manageable(user, id) do |user, department|
          if user=user.tenant.users.find_by_id(user_id)
            if ud=user.user_departments.where(department_id: id).first
              yield(ud) if block_given?
            else
              ApiMessage.new(messages: ['User not added to Department yet'])
            end
          else
            ApiMessage.new(messages: ['User not found'])
          end
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.get_department(user, department_id)
    user.tenant.departments.find_by_id(department_id)
  end

  def self.check_user_manageable(user, department_id)
    if department=get_department(user, department_id)
      if department.manageable(user)
         if block_given?
           yield(user, department)
         else
           department
         end
      else
        ApiMessage.new(messages: ['Department not manageable'])
      end
    else
      ApiMessage.new(messages: ['Department not found'])
    end
  end
end
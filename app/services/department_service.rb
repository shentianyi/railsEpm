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
      parent=Department.find_by_id(department[:parent_id]) if department[:parent_id]
      department=Department.new(department.except(:parent_id))
      department.creator=user
      department.tenant=user.tenant
      department.parent=parent if parent
      # set user as manager and add user to the user departments
      ud=department.user_departments.build(is_manager: true)
      ud.department=department
      user.user_departments<<ud
      if department.save
        UserDepartmentPresenter.new(ud).as_basic_feedback(['Department Create Success'], 1)
      else
        UserDepartmentPresenter.new(ud).as_basic_feedback(department.errors.full_messages)
      end
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
        if department=Department.find_by_id(id)
          # find reg users
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
        else
          ApiMessage.new(messages: ['Department not found'])
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
  def self.remove_user(user_id, id)
    user_manager(user_id, id) { |ud|
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
  def self.set_manager(user_id, id)
    user_manager(user_id, id) { |ud|
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
  def self.remove_manager(user_id, id)
    user_manager(user_id, id) { |ud|
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
      UserDepartmentPresenter.as_user_department_infos(user.root_user_departments)
    else
      UserDepartmentPresenter.as_user_department_infos(user.user_departments
                                                           .joins(:department)
                                                           .where(department_id: Department.find_by_id(department_id).children.pluck(:id)))
    end
  end

  private
  def self.user_manager(user_id, id)
    begin
      UserDepartment.transaction do
        if Department.find_by_id(id)
          if user=User.find_by_id(user_id)
            if ud=user.user_departments.where(department_id: id).first
              yield(ud) if block_given?
            else
              ApiMessage.new(messages: ['User not added to Department yet'])
            end
          else
            ApiMessage.new(messages: ['User not found'])
          end
        else
          ApiMessage.new(messages: ['Department not found'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end
end
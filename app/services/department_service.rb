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
          ApiMessage.new(messages: ['Users added or invited'],result_code: 1)
        else
          ApiMessage.new(messages: ['Department not found'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end
end
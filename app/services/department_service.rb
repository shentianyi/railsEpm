class DepartmentService

  # create department
  # require
  #  department: hash
  #     name: string, required
  #     description: string, optional
  #     parent_id: integer, optional
  #  user: object, required
  def self.create_department department, user
    Department.transaction do
      department=Department.new(department.except(:parent_id))
      department.creator=user
      department.tenant=user.tenant
      parent=Department.find_by_id(department[:parent_id]) if department[:parent_id]
      department.parent=parent if parent
      # set user as manager and add user to the user departments
      ud=department.user_departments.build(is_manager: true)
      user.user_departments<<ud
      if department.save

      else

      end
    end
  end
end
class DepartmentService

  # create department
  # require
  #  department: hash
  #     name: string, required
  #     parent_id: integer, optional
  #  user: object, required
  def self.create_department department, user
    department=Department.new(department.except(:parent_id))
    department.creator=user
    department.tenant=user.tenant
    parent=Department.find_by_id(department[:parent_id]) if department[:parent_id]
    department.parent=parent if parent

    department.save
  end
end
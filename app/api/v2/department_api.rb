module V2
  class DepartmentApi<Base
    guard_all!
    namespace :departments do
      params do
        requires :name, type: String, desc: 'department name'
        optional :parent_id, type: Integer, desc: 'parent department id'
      end
      post do
        DepartmentService.create_department(
            {
                name: params[:name],
                parent_id: params[:parent_id]
            },
            current_user)
      end
    end
  end
end
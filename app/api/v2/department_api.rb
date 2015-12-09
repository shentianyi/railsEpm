module V2
  class DepartmentApi<Base
    guard_all!
    namespace :departments do

      # create
      params do
        requires :name, type: String, desc: 'department name'
        optional :description, type: String, desc: 'department desc'
        optional :parent_id, type: Integer, desc: 'parent department id'
      end
      post do
        DepartmentService.create_department(
            {
                name: params[:name],
                description: params[:description],
                parent_id: params[:parent_id]
            },
            current_user)
      end

      # update
      put do

      end

      # delete
      delete do

      end


      params do
        requires :emails, type: Array, desc: 'user emails'
        requires :id, type: Integer, desc: 'department id'
      end
      post :add_users do
        DepartmentService.add_department_users(params[:emails], params[:id], current_user)
      end


    end
  end
end
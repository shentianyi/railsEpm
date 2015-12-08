module V2
  class DepartmentApi<Base
    guard_all!
    namespace :departments do

      # create
      params do
        requires :name, type: String, desc: 'department name'
        optional :description,type:String,desc: 'department desc'
        optional :parent_id, type: Integer, desc: 'parent department id'
      end
      post do
        DepartmentService.create_department(
            {
                name: params[:name],
                description:params[:description],
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


    end
  end
end
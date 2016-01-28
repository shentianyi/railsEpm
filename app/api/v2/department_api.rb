module V2
  class DepartmentAPI<Base
    guard_all!
    namespace :departments do

      # get
      params do
        requires :id, type: Integer, desc: 'department id'
      end
      get do

      end


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
      params do
        requires :id, type: Integer, desc: 'department id'
        requires :name, type: String, desc: 'department name'
        optional :description, type: String, desc: 'department desc'
      end
      put do
        DepartmentService.update_department(
            {
                name: params[:name],
                description: params[:description],
                id: params[:id]
            },
            current_user)
      end

      # delete
      params do
        requires :id, type: Integer, desc: 'department id'
      end
      delete do
        DepartmentService.delete_department(params[:id], current_user)
      end

      # get department members
      params do
        requires :id, type: Integer, desc: 'department id'
      end
      get :members do
        DepartmentService.members(params[:id],current_user)
      end

      # add users
      params do
        requires :emails, type: Array, desc: 'user emails'
        requires :id, type: Integer, desc: 'department id'
      end
      post :add_users do
        DepartmentService.add_department_users(params[:emails], params[:id], current_user)
      end

      # add user
      params do
        requires :user_id, type: Integer, desc: 'user id'
        requires :id, type: Integer, desc: 'department id'
      end
      post :add_user do
        DepartmentService.add_department_user(params[:user_id], params[:id], current_user)
      end

      # remove user
      params do
        requires :user_id, type: Integer, desc: 'user id'
        requires :id, type: Integer, desc: 'department id'
      end
      post :remove_user do
        DepartmentService.remove_user(params[:user_id], params[:id],current_user)
      end

      # set manager
      params do
        requires :user_id, type: Integer, desc: 'user id'
        requires :id, type: Integer, desc: 'department id'
      end
      post :set_manager do
        DepartmentService.set_manager(params[:user_id], params[:id],current_user)
      end

      # remove manager
      params do
        requires :user_id, type: Integer, desc: 'user id'
        requires :id, type: Integer, desc: 'department id'
      end
      post :remove_manager do
        DepartmentService.remove_manager(params[:user_id], params[:id],current_user)
      end
    end
  end
end
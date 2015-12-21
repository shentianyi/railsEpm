module V2
  class UserGroupAPI < Base

    namespace :user_groups do
      guard_all!

      params do
        requires :user_groups, type: Hash do
          requires :name, type: String, desc: "user group name"
          requires :users, type: Array, desc: "user id list"
        end
      end
      post do
        UserGroupService.create params[:user_groups], current_user
      end

      params do
        requires :user_groups, type: Hash do
          requires :id, type: Integer, desc: "user group id"
          requires :name, type: String, desc: "user group name"
          requires :users, type: Array, desc: "user id list"
        end
      end
      put do
        UserGroupService.update params[:user_groups], current_user
      end

      params do
        requires :id, type: Integer, desc: "user group id"
      end
      get do
        UserGroupService.details params
      end

      params do
        optional :kpi_id, type: Integer, desc: "kpi id"
      end
      get :for_kpis do
        UserGroupService.as_select params
      end

    end
  end
end

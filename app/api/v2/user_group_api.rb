module V2
  class UserGroupAPI < Base

    namespace :user_groups do
      guard_all!

      params do
        requires :user_group_list, type: Hash do
          requires :list_name, type: String, desc: "user group list name"
          requires :users, type: Array, desc: "user id list"
        end
      end
      get do
        if kpi = Kpi.find_by_id(params[:kpi_id])
          KpiService.details(kpi)
        else
          ApiMessage.new(messages: ['Kpi Not Exists'])
        end
      end


    end
  end
end

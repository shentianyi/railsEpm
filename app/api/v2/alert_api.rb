module V2
  class AlertAPI<Base
    guard_all!

    namespace :alerts do

      namespace :kpi_follows do
        params do
          requires :id, type: Integer, desc: 'user follow id'
        end
        get :latest do
          AlertService.get_latest_kpi_follow_alert(current_user, params[:id])
        end
      end
    end
  end
end
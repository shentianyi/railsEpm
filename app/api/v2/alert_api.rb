module V2
  class AlertAPI<Base
    guard_all!

    namespace :alerts do

      namespace :kpi_follows do
        params do
          requires :id, type: Integer, desc: 'user follow id'
        end
        get :latest do
          AlertService.get_latest_kpi_follow_alert(params[:id])
        end
      end


      namespace :users do
        namespace :counts do
          get :unread do
            AlertService.unread_alerts_count(current_user)
          end
        end
      end

      params do
        requires :id, type: Integer, desc: 'alert id'
        requires :offset, type: Integer, desc: 'alert offset'
      end
      post :read do
        AlertService.read_alert params[:id], params[:offset]
      end

      params do
        optional :page, type: Integer, default: 0, desc: 'page index start from 0'
        optional :size, type: Integer, default: 20, desc: 'page size'
      end
      get :tasks do
        AlertService.task_alerts(current_user, params[:page], params[:size])
      end

      params do
        optional :page, type: Integer, default: 0, desc: 'page index start from 0'
        optional :size, type: Integer, default: 20, desc: 'page size'
      end
      get :kpi_followed do
        AlertService.kpi_followed_alerts(current_user, params[:page], params[:size])
      end

      params do
        optional :page, type: Integer, default: 0, desc: 'page index start from 0'
        optional :size, type: Integer, default: 20, desc: 'page size'
      end
      get :systems do
        AlertService.system_alerts(current_user, params[:page], params[:size])
      end

    end
  end
end
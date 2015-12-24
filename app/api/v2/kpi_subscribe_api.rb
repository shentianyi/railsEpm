module V2
  class KpiSubscribeAPI<Base
    guard_all!
    namespace :kpis do

      namespace :follows do

        params do
          requires :id, type: Integer, desc: 'user follow id'
        end
        get do
          KpiSubscribeService.user_followed_detail(current_user, params[:id])
        end

      end
    end
  end
end
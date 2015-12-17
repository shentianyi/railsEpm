module V2
  class KpiAPI<Base
    guard_all!

    namespace :kpis do
      params do
        requires :kpi_settings, type: Hash do
          requires :kpi, type: Hash do
            requires :target_max, type: Float, desc: "kpi target max"
            requires :target_min, type: Float, desc: "kpi target min"
            requires :viewable, type: Integer, desc: "kpi viewable"
            requires :calculate_method, type: Integer, desc: "kpi calculate method"
          end
        end
      end
      post do
        KpiService.building(params[:kpi], current_user)
      end

      get :unit_of_measurements do
        KpiService.unit_select
      end

      get :calculate_methods do
        KpiService.calculate_select
      end

      get :timing_frequencies do
        KpiService.frequency_select
      end

      post :follow do
        if (params[:lower_boundary] > params[:upper_boundary]) || (params[:lower_boundary] < 0) || (params[:upper_boundary] < 0)
          return ApiMessage.new(messages: ['Invlid Upper Or Lower Boundary'])
        end

        unless params[:auto_notification].is_a?(Boolean)
          return ApiMessage.new(messages: ['Invlid Auto Notification Value'])
        end

        KpiService.follow_kpi({
                                  user: current_user,
                                  lower_boundary: params[:lower_boundary],
                                  upper_boundary: params[:upper_boundary],
                                  ks: {
                                      kpi_id: params[:kpi_id],
                                      department_id: params[:department_id],
                                      auto_notification: params[:auto_notification]
                                  }
                              })
      end

      params do
        requires :kpi_id, type: Integer, desc: 'kpi id'
        requires :department_id, type: Integer, desc: 'department id'
      end
      post :unfollow do
        KpiService.unfollow_kpi({
                                    user: current_user,
                                    kpi_id: params[:kpi_id],
                                    department_id: params[:department_id]
                                })
      end

      namespace :users do

        get :accesses do
          KpiService.accessable_list(current_user)
        end


        params do
          optional :user_id, type: String, desc: 'user id'
        end
        get :followed do
          user=params[:user_id].blank? ? current_user : User.accessible_by(current_ability).find_by_id(params[:user_id])
          KpiService.user_followed_kpis(user)
        end

        params do
          optional :user_id, type: String, desc: 'user id'
        end
        get :created do
          user=params[:user_id].blank? ? current_user : User.accessible_by(current_ability).find_by_id(params[:user_id])
          KpiService.user_created_kpis(user)
        end
      end
    end
  end
end
module V2
  class KpiAPI<Base
    guard_all!

    namespace :kpis do
      params do
        requires :kpi_id, type: Integer, desc: "kpi id"
      end
      get do
        if kpi = Kpi.find_by_id(params[:kpi_id])
          KpiService.details(kpi)
        else
          ApiMessage.new(messages: ['Kpi Not Exists'])
        end
      end

      params do
        requires :kpi, type: Hash do
          requires :target_max, type: Float, desc: "kpi target max"
          requires :target_min, type: Float, desc: "kpi target min"
          # requires :viewable, type: Integer, desc: "kpi viewable"
          requires :calculate_method, type: Integer, desc: "kpi calculate method"
        end
      end
      post do
        KpiService.building(params, current_user)
      end

      params do
        requires :kpi, type: Hash do
          requires :target_max, type: Float, desc: "kpi target max"
          requires :target_min, type: Float, desc: "kpi target min"
          requires :kpi_id, type: Integer, desc: "kpi id"
          requires :calculate_method, type: Integer, desc: "kpi calculate method"
        end
      end
      put do
        if params[:kpi][:kpi_id].present? && kpi=Kpi.find_by_id(params[:kpi][:kpi_id])
          KpiService.updating(params, current_user, kpi)
        end
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
        if (params[:lower_boundary].to_f > params[:upper_boundary].to_f) || (params[:lower_boundary].to_f < 0) || (params[:upper_boundary].to_f < 0)
          return ApiMessage.new(messages: ['Invlid Upper Or Lower Boundary'])
        end

        # unless params[:auto_notification].is_a?(Boolean)
        #   return ApiMessage.new(messages: ['Invlid Auto Notification Value'])
        # end

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

        params do
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :accesses do
          KpiService.user_accessable_kpis(current_user,params[:page],params[:size])
        end


        params do
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :followed do
          KpiService.user_followed_kpis(current_user,params[:page],params[:size])
        end

        params do
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :created do
          KpiService.user_created_kpis(current_user,params[:page],params[:size])
        end
      end

      namespace :properties do
        params do
          requires :kpi_id, type: Integer, desc: 'kpi id'
        end
        get do
          KpiService.properties params[:kpi_id]
        end

        params do
          requires :kpi_id, type: Integer, desc: 'kpi id'
          requires :name, type: String, desc: 'property name'
          requires :type, type: String, desc: 'property type'
        end
        post do
          KpiService.add_properties params, current_user
        end

        params do
          requires :kpi_id, type: Integer, desc: 'kpi id'
          requires :property_id, type: Integer, desc: 'property id'
          requires :name, type: String, desc: 'property name'
          requires :type, type: String, desc: 'property type'
        end
        put do
          KpiService.update_properties params
        end
      end

      namespace :assigns do
        params do
          requires :kpi_id, type: Integer, desc: 'kpi id'
        end
        get do
          KpiService.assigns params
        end

        params do
          requires :kpi_id, type: Integer, desc: 'kpi id'
          requires :assigns, type: Array do
            requires :user, type: String, desc: 'user email'
            requires :department_id, type: String, desc: 'department id'
            requires :time, type: String, desc: 'task time'
            requires :frequency, type: String, desc: 'task frequency'
          end
        end
        post do
          KpiService.add_assigns params, current_user
        end

        params do
          requires :assignment_id, type: Integer, desc: 'assignment id'
        end
        delete do
          KpiService.unassign params
        end
      end

    end
  end
end
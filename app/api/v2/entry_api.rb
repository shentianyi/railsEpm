module V2
  class EntryAPI<Base
    guard_all!
    namespace :entries do

      params do
        optional :task_item_id, type: Integer, desc: 'task item id'
        requires :data, type: Hash do
          requires :kpi_id, type: Integer, desc: 'kpi id'
          requires :department_id, type: Integer, desc: 'department id'
          requires :data, type: Hash do
            requires :value, type: Float, desc: 'value'
            requires :time, type: Time, desc: 'utc time'
            requires :attributes, type: Array do
              requires :id, type: Integer, desc: 'kpi property id'
              requires :value, type: String, desc: 'kpi property value'
            end
          end
        end
      end
      post do
        EntryService.create_entry(params, current_user)
      end


      params do
        requires :kpi_id, type: Integer, desc: 'kpi id'
        requires :department_id, type: Integer, desc: 'department id'
        requires :frequency, type: Integer, desc: 'kpi frequency'

      end
      get :chart_data do

      end

      get :chart_aggregate do

      end
    end
  end
end
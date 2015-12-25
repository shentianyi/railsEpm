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
            requires :time, type: DateTime, desc: 'utc time'
            requires :attributes, type: Array do
              requires :attribute_id, type: Integer, desc: 'kpi property id'
              requires :attribute_value, type: String, desc: 'kpi property value'
            end
          end
        end
      end
      post do
        EntryService.create_entry(params, current_user)
      end

      params do
        optional :follow_id, type: Integer, desc: 'follow id'
        optional :kpi_id, type: Integer, desc: 'kpi id'
        optional :department_id, type: Integer, desc: 'department id'
        requires :frequency, type: Integer, desc: 'kpi frequency', values: KpiFrequency.values
        requires :calculate_method, type: Integer, desc: 'calculate method', values: KpiCalculate.values
        requires :from_time, type: DateTime, desc: 'from time, utc'
        requires :end_time, type: DateTime, desc: 'end time, utc'
        optional :attributes, type: Array do
          requires :attribute_id, type: Integer, desc: 'attribute id'
          requires :values, type: Array, desc: 'attribute values'
        end
      end
      get :chart_data do
        EntryService.get_entry_chart_data(params, current_user)
      end


      params do
        optional :follow_id, type: Integer, desc: 'follow id'
        optional :kpi_id, type: Integer, desc: 'kpi id'
        optional :department_id, type: Integer, desc: 'department id'
        requires :frequency, type: Integer, desc: 'kpi frequency', values: KpiFrequency.values
        requires :calculate_method, type: Integer, desc: 'calculate method', values: KpiCalculate.values
        requires :from_time, type: DateTime, desc: 'from time, utc'
        requires :end_time, type: DateTime, desc: 'end time, utc'
        optional :attributes, type: Array do
          requires :attribute_id, type: Integer, desc: 'attribute id'
          optional :values, type: Array, desc: 'attribute values'
        end
      end
      get :chart_aggregate_data do
        EntryService.get_entry_chart_aggregate_data(params, current_user)
      end
    end
  end
end
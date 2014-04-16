module Entry
  module Aggregator
    class BaseAnalyseAggregator<BaseAggregator
      attr_accessor :current, :current_count, :target_max, :target_min,
                    :unit, :frequency
      #, :total, :average

      def initialize(parameter)
        super
        init_data_module
      end

      def aggregate
        query_condition=Entry::ConditionService.new(self.parameter).build_base_query_condition
        query=Entry::QueryService.new.base_query(KpiEntry, query_condition[:base], query_condition[:property]).where(entry_type: 1)

        map=%Q{
           function(){
                  #{Mongo::Date.date_format}
                  emit({date:format(this.parsed_entry_at,'#{self.parameter.date_format}')},parseFloat(this.value));
              };
        }
        func=self.parameter.average ? 'avg' : 'sum'
        reduce=%Q{
           function(key,values){return Array.#{func}(values);};
        }
        query.map_reduce(map, reduce).out(inline: true).each do |d|
          key= d['_id']['date']
          self.current[key]=d['value']
        end

        self.data_module= {:current => self.current,
                           :target_max => self.target_max,
                           :target_min => self.target_min,
                           :unit => self.unit}

        return aggregate_type_data
      end

      private
      def aggregate_type_data
        self.current.each { |key, value| self.current[key]=KpiUnit.parse_entry_value(self.parameter.kpi.unit, value) }
        case self.parameter.data_module
          when Entry::DataService::WEB_HIGHSTOCK
            return generate_web_highstock_data
          when Entry::DataService::IOS_TABLE
            return self.data_module
          when Entry::DataService::WEB_HIGHSTOCK_IOS_TABLE
            return generate_web_highstock_data, self.data_module
          else
            return nil
        end
      end

      def init_data_module
        self.current_count, self.current, self.frequency, self.target_min, self.target_max, self.unit=BaseAnalyseAggregator.new_hash(6)
        @kpi_uni_sym=self.parameter.kpi.unit_sym
        target_relation=UserKpiItem.where(kpi_id: self.parameter.kpi.id, entity_id: self.parameter.entities)
        @target_max_current= self.parameter.average ? (avg=target_relation.average(:target_max)).nil? ? 0 : avg.round(2).to_f : target_relation.sum(:target_max)
        @target_min_current= self.parameter.average ? (avg=target_relation.average(:target_min)).nil? ? 0 : avg.round(2).to_f : target_relation.sum(:target_min)
        frequency=self.parameter.frequency
        start_time=self.parameter.start_time
        end_time=self.parameter.end_time

        case frequency
          when KpiFrequency::Hourly, KpiFrequency::Daily, KpiFrequency::Weekly
            case frequency
              when KpiFrequency::Hourly
                step=3600 #60*60
              when KpiFrequency::Daily
                step=86400 #60*60*24
              when KpiFrequency::Weekly
                step=604800 #60*60*24*7
            end
            while start_time<=end_time do
              next_time=start_time+step
              generate_init_frequency(start_time)
              start_time=next_time
            end
          when KpiFrequency::Monthly
            while start_time<=end_time do
              if start_time.month==2
                next_time=start_time+(start_time.year.leap? ? 2505600 : 2419200) #(60*60*24*29 : 60*60*24*28)
              else
                next_time=start_time+([1, 3, 5, 7, 8, 10, 12].include?(start_time.month+1) ? 2678400 : 2592000) #(60*60*24*31 : 60*60*24*30)
              end
              generate_init_frequency(start_time)
              start_time=next_time
            end
          when KpiFrequency::Quarterly
            step_arr=[90, 91, 92, 92]
            while start_time<=end_time do
              if (start_time.month-1)/3==3
                next_time=start_time+((start_time.year+1).leap? ? 86400*(step_arr[0]+1) : 86400*step_arr[0])
              else
                next_time=start_time+86400*step_arr[(start_time.month-1)/3+1]
              end
              generate_init_frequency(start_time)
              start_time=next_time
            end
          when KpiFrequency::Yearly
            while start_time<=end_time do
              next_time=start_time+((start_time.year+1).leap? ? 31622400 : 31536000)
              generate_init_frequency(start_time)
              start_time=next_time
            end
        end
      end

      def generate_init_frequency(key)
        self.current[key]=0
        self.target_max[key]=@target_max_current
        self.target_min[key]=@target_min_current
        self.unit[key]= @kpi_uni_sym
      end

      def generate_web_highstock_data
        web_highstock_data={}
        self.data_module.each { |k, v| web_highstock_data[k]=v.kind_of?(Hash) ? v.values : v }
        web_highstock_data[:date]=self.current.keys
        return web_highstock_data
      end

      def self.new_hash(n=0)
        Array.new(n) { Hash.new }
      end
    end
  end
end

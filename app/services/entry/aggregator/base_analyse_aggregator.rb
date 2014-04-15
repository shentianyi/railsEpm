module Entry
  module Aggregator
    class BaseAnalyseAggregator<BaseAggregator
      attr_accessor :current, :current_count, :target_max, :target_min,
                    :unit, :frequency, :total, :average

      def initialize(parameter)
        self.parameter =parameter
        init_data_module
      end

      def aggregate
        query_condition=Entry::ConditionService.new(self.parameter).build_base_query_condition
        query=Entry::QueryService.new.base_query(KpiEntry, query_condition[:base], query_condition[:property]).where(entry_type: 1)

        format=case self.parameter.frequency
                 when KpiFrequency::Hourly
                   'yyyy-MM-dd HH'
                 when KpiFrequency::Daily
                   'yyyy-MM-dd'
                 when KpiFrequency::Weekly
                   'yyyy-WW'
                 when KpiFrequency::Monthly
                   'yyyy-MM'
                 when KpiFrequency::Quarterly
                   'yyyy-qq'
                 when KpiFrequency::Yearly
                   'yyyy'
               end
        map=%Q{
           function(){
                  #{Mongo::Date.date_format}
                  emit({date:format(this.parsed_entry_at,'#{format}')},parseFloat(this.value));
              };
        }
        reduce=%Q{
           function(key,values){return Array.sum(values);};
        }
        query.map_reduce(map, reduce).out(inline: true).each do |d|
          key= d['_id']['date']
          self.current[key]=d['value']
          self.target_max[key]=@target_max_current
          self.target_min[key] =@target_min_current
          self.unit[key]=@kpi_uni_sym
        end
        self.data_module= {:current => self.current,
                           :target_max => self.target_max,
                           :target_min => self.target_min,
                           :unit => self.unit,
                           :total => 0,
                           :average => 0}
        return aggregate_type_data
      end

      private
      def aggregate_type_data
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
        self.total=self.average =0
        @kpi_uni_sym=self.parameter.kpi.unit_sym
        target_relation=UserKpiItem.where(kpi_id: self.parameter.kpi.id, entity_id: self.parameter.entities)
        @target_max_current= self.parameter.average ? (avg=target_relation.average(:target_max)).nil? ? 0 : avg.round(2).to_f : target_relation.sum(:target_max)
        @target_min_current= self.parameter.average ? (avg=target_relation.average(:target_min)).nil? ? 0 : avg.round(2).to_f : target_relation.sum(:target_min)
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

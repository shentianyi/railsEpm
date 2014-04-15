module Entry
  module Aggregator
    class PeriodCompareAggregator<BaseAggregator
      attr_accessor :data

      def aggregate
        c=Entry::ConditionService.new(self.parameter)
        query_condition=c.build_base_query_condition
        mr_condition=c.build_map_reduce_condition
        query=Entry::QueryService.new.base_query(KpiEntry, query_condition[:base], query_condition[:property]).where(entry_type: 0)
        query=query.any_of(c.build_or_condition)

        mr_condition[:map_group]+=",date:format(this.parsed_entry_at,'#{self.parameter.date_format}')"
      puts '-------------------------------------------------'
        puts mr_condition[:map_group]
        puts '-------------------------------------------------'
        #map=%Q{
        #   #{Mongo::Date.date_format}
        #   function(){emit({entity_id:this.entity_id,date:format(this.parsed_entry_at,'yyyy-MM')},parseFloat(this.value));};
        #}

        map=%Q{
           function(){
                  #{Mongo::Date.date_format}
                  emit({#{mr_condition[:map_group]}},parseFloat(this.value));
              };
        }

        func=self.parameter.average ? 'avg' : 'sum'
        reduce=%Q{
           function(key,values){return Array.#{func}(values);};
        }
        self.data=query.map_reduce(map, reduce).out(inline: true)
        aggregate_type_data
      end

      private
      def aggregate_type_data
        return case self.parameter.data_module
                 when Entry::DataService::PERIOD_COMPARE_TABLE
                   generate_compare_table
                 when Entry::DataService::PERIOD_COMPARE_CHART
                   generate_compare_chart
               end
      end

      def generate_compare_table
        self.data.each do |d|
          puts d
        end
      end

      def generate_compare_chart
        self.data.each do |d|
          puts d
        end
      end
    end
  end
end
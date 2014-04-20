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
        data_mr="date:format(this.parsed_entry_at,'#{self.parameter.date_format}')"
        mr_condition[:map_group]=
            mr_condition[:map_group].nil? ? data_mr : "#{mr_condition[:map_group]},#{data_mr}"

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
        self.data_module={}
        values=KpiPropertyValue.by_property_id(self.parameter.kpi.id, self.parameter.map_group.values.map { |v| v.sub(/a/, '') }).all
        values.each do |v|
          self.data_module[v.value]=[
              {self.parameter.base_time[:start_time] => 0},
              {self.parameter.compare_times.first[:start_time] => 0}]
        end

        date_parse_proc=KpiFrequency.parse_short_string_to_date(self.parameter.frequency)

        self.data.each do |d|
          name=d['_id'][self.parameter.map_group.first[0]]
          date=date_parse_proc.call(d['_id']['date'])
          self.data_module[name].each { |v| v[date]= KpiUnit.parse_entry_value(self.parameter.kpi.unit, d['value']) }
        end

        data=[]
        self.data_module.each do |k, v|
          data<<{name: k, value: v[0].values.first, last_value: v[1].values.first}
        end
        return data
      end

      def generate_compare_chart
        self.data_module={}
        self.parameter.times.sort_by { |t| t[:start_time] }.each do |time|
          self.data_module[time[:start_time]]=0
        end
        date_parse_proc=KpiFrequency.parse_short_string_to_date(self.parameter.frequency)
        self.data.each do |d|
          date=date_parse_proc.call(d['_id']['date'])
          self.data_module[date]= KpiUnit.parse_entry_value(self.parameter.kpi.unit, d['value'])
        end
        return {keys: self.data_module.keys, values: self.data_module.values}
      end
    end
  end
end
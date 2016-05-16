module Entry
  module Aggregator
    class PeriodCompareAggregator<BaseAggregator

      def aggregate
        c=Entry::ConditionService.new(self.parameter)
        query_condition=c.build_base_query_condition
        mr_condition=c.build_map_reduce_condition
        query=Entry::QueryService.new.base_query(KpiEntry, query_condition[:base], query_condition[:property]).where(entry_type: 0)
        query=query.any_of(c.build_or_condition)
        data_mr="date:format(this.entry_at,'#{self.parameter.date_format}')"
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
        ids=self.parameter.map_group.values.map { |v| v.sub(/a/, '').to_i }
        values=KpiPropertyValue.by_property_id(self.parameter.kpi.id, ids).all
        return nil if values.size==0
        properties={}

        puts "##ids...............#{ids}"
        puts "#values............#{values}"

        ids.each do |id|
          values.select { |vv| vv.kpi_property_id==id }.each do |v|
            properties[v.kpi_property_id]||=[]
            properties[v.kpi_property_id]<< v.value #.upcase
          end
        end
        puts '-------------'
        self.parameter.clean_property_values(properties)
        metrix=[]
        size=properties.size
        if size==1
          metrix=properties.values[0].product
        else
          metrix=properties.values[0].product(*properties.values[1...size])
        end

        puts '********************'
        p metrix
        puts '********************'
        metrix.each do |m|
          self.data_module[m]= [{self.parameter.base_time[:start_time] => 0},
                                {self.parameter.compare_times.first[:start_time] => 0}]
        end


        date_parse_proc=KpiFrequency.parse_short_string_to_date(self.parameter.frequency)
        property_ids=properties.keys

        puts '***********'
        puts self.data_module
        puts '***********'

        data_module_keys={}
        self.data_module.keys.each do |key|
          data_module_keys[key.map { |kk| kk.downcase }]=key
        end
        puts "%%%%%%%%%%%%%%%%%%%#{property_ids}---#{data_module_keys}"
        self.data.each do |d|
          key=[]
          property_ids.each do |id|
            key<<d['_id'][id.to_s].downcase
          end

          date=date_parse_proc.call(d['_id']['date'])
          p '------------'
          p d['_id']
          puts date
          d['_id'].values.each { |v| p v.class }
          p d['value']
          p '-------------'

          self.data_module[data_module_keys[key]].each { |v|
            puts 'OOOOOOOOOOOOOOOOOOOO'
            puts v
            puts date
            puts v[date]
            puts KpiUnit.parse_entry_value(self.parameter.kpi.unit, d['value'])
            puts ')))))))))))))))))))))'
            v[date]+= KpiUnit.parse_entry_value(self.parameter.kpi.unit, d['value']) if v.has_key?(date)
          } if data_module_keys.keys.include?(key)
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

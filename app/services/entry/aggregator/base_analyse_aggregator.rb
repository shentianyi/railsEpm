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
        c=Entry::ConditionService.new(self.parameter)
        query_condition=c.build_base_query_condition
        mr_condition=c.build_map_reduce_condition
        query_serivice= Entry::QueryService.new
        if query_condition[:property]
          query=query_serivice.base_query(KpiEntry, query_condition[:base], query_condition[:property]).where(entry_type: 0)
        else
          query=query_serivice.base_query(KpiEntry, query_condition[:base]).where(entry_type: 1)
        end
        puts '-----------------------------------------------------query condition'
        puts query_condition
        puts '-----------------------------------------------------equal condition'

        puts self.parameter.date_format

        puts '-----------------------------------------------------query parameter end  '

        data_mr="date:format(this.parsed_entry_at,'#{self.parameter.date_format}')"
        puts '*******************************************************'
        puts mr_condition[:map_group]
        puts '*******************************************************'
        mr_condition[:map_group]=
            mr_condition[:map_group].nil? ? data_mr : "#{mr_condition[:map_group]},#{data_mr}"
        puts mr_condition[:map_group]
        puts '*******************************************************'
        equal_condition=query_condition[:base].merge(query_condition[:property]||{})
        group_keys=self.parameter.all_map_group
        ClearInsight::Service.new.base_query(equal_condition, group_keys, self.parameter.kpi)
        map=%Q{
           function(){
                  #{Mongo::Date.date_format}
                  emit({#{mr_condition[:map_group]}},parseFloat(this.value));
              };
        }
        func=self.parameter.average ? 'avg' : 'sum'
        reduce=%Q{
           function(key,values){
            return Array.#{func}(values);};
        }

        self.data= query.map_reduce(map, reduce).out(inline: true)


        puts ')))))))))))))))))))))))))))))))))))))))))'
        puts data.to_json
        puts ')))))))))))))))))))))))))))))))))))))))))'

        return aggregate_type_data
      end

      private
      def aggregate_type_data
        date_parse_proc=KpiFrequency.parse_short_string_to_date(self.parameter.frequency)
        if self.parameter.kpi.is_calculated && !self.parameter.property.blank?
          data={}
          self.data.each do |d|
            key=date_parse_proc.call(d['_id']['date'])
            data[key]||={}
            data[key][d['_id']['kpi'].to_i.to_s] =d['value']
          end
          data.each do |k, v|
            begin
              self.current[k]=self.parameter.kpi.calculate_formula(v)
            rescue
              self.current[k]=0
            end
          end
        else

          self.data.each do |d|
            self.current[date_parse_proc.call(d['_id']['date'])]=d['value'][self.value_key]
          end
        end

        self.data_module= {:current => self.current,
                           :target_max => self.target_max,
                           :target_min => self.target_min,
                           :unit => self.unit}

        self.current.each { |key, value| self.current[key]=KpiUnit.parse_entry_value(self.parameter.kpi.unit, value) }
<<<<<<< HEAD
=======
        #puts '*****'
        #puts self.data_module[:current].keys.to_json
        #puts self.data_module[:current].keys.size
        #puts self.data_module[:target_max].keys.to_json
        #puts self.data_module[:target_max].keys.size
        #puts '******'
>>>>>>> 17eca4d12676328820042c058b1cd915c08b5fb4
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
                end_time=end_time+1.hour-1.second
              when KpiFrequency::Daily
                step=1.day #60*60*24
                end_time=end_time+1.day-1.second
              when KpiFrequency::Weekly
                start_time+=8.hours
                end_time+=8.hours
                step=7.days #60*60*24*7
                start_time=Date.parse(start_time.to_s)
                end_time=Date.parse(end_time.to_s)
                start_time=Time.parse(Date.commercial(start_time.year, start_time.cweek, 1).to_s).utc
                end_time=Time.parse(Date.commercial(end_time.year, end_time.cweek, 1).to_s).utc + 1.week - 1.second
            end
            self.parameter.start_time=start_time
            self.parameter.end_time=end_time

            while start_time<=end_time do
              next_time=start_time+step
              generate_init_frequency(start_time)
              start_time=next_time
            end
          when KpiFrequency::Monthly
            start_time.localtime
            end_time.localtime

            start_time=Time.new(start_time.year, start_time.month, 1).utc
            end_time=Time.new(end_time.year, end_time.month, 1).utc + 1.month-1.second

            self.parameter.start_time=start_time
            self.parameter.end_time=end_time

            while start_time<=end_time do
              next_time=start_time.localtime.next_month
              next_time=Time.new(next_time.year, next_time.month, 1).utc
              generate_init_frequency(start_time.utc)
              start_time=next_time
            end

          when KpiFrequency::Quarterly
            start_time.localtime
            end_time.localtime

            step_arr=[90, 91, 92, 92]
            start_time=Time.new(start_time.year, (start_time.month-1)/3*3+1, 1).utc
            end_time=Time.new(end_time.year, (end_time.month-1)/3*3+3, 1).utc+1.month-1.second

            self.parameter.start_time=start_time
            self.parameter.end_time=end_time

            while start_time<=end_time do
              next_time= start_time.localtime+3.months
              next_time=Time.new(next_time.year, next_time.month, 1).utc
              generate_init_frequency(start_time.utc)
              start_time=next_time
            end
          when KpiFrequency::Yearly
            start_time.localtime
            end_time.localtime

<<<<<<< HEAD
            start_time=Time.parse(Date.new(start_time.year, 1, 1).to_s).utc
            end_time=Time.parse(Date.new(end_time.year, 1, 1).to_s).utc
=======
            start_time=Time.new(start_time.year, 1, 1).utc
            end_time=Time.new(end_time.year, 1, 1).utc+1.year-1.second

            self.parameter.start_time=start_time
            self.parameter.end_time=end_time
>>>>>>> 17eca4d12676328820042c058b1cd915c08b5fb4

            while start_time<=end_time do
              next_time=Time.new(start_time.localtime.year+1, 1, 1).beginning_of_year.utc
              generate_init_frequency(start_time.utc)
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

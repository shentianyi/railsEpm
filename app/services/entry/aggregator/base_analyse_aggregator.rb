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
        if query_condition[:property]
          query=Entry::QueryService.new.base_query(KpiEntry, query_condition[:base], query_condition[:property]).where(entry_type: 0)
        else
          query=Entry::QueryService.new.base_query(KpiEntry, query_condition[:base]).where(entry_type: 0)
        end

        func=self.parameter.average ? 'avg' : 'sum'
        reduce=%Q{
              function(key,values){
              var m='#{func}';
              var result={count:0,total:0,value:0};
              for(var i=0;i<values.length;i++){
                 result.count+=values[i].count;
                 result.total+=values[i].total;
              }
              return result;};
          }
        finalize=%Q{
             function(key, reducedVal){
                   var m='#{func}';
                   if(m=='avg'){
                        reducedVal.value=reducedVal.total/reducedVal.count;
                        }else{
                            reducedVal.value=reducedVal.total;
                        }
                         return reducedVal;
                };
              }


        if self.parameter.x_group[:type]==XGroupType::DATE || self.parameter.x_group[:type]==XGroupType::PROPERTY

          if self.parameter.x_group[:type]==XGroupType::DATE
            if self.parameter.entity_group_single_entity
              data_mr="date:format(this.entry_at,'#{self.parameter.date_format}'),entity_id:this.entity_id"
            else
              data_mr="date:format(this.entry_at,'#{self.parameter.date_format}')"
            end
            mr_condition[:map_group]=
                mr_condition[:map_group].nil? ? data_mr : "#{mr_condition[:map_group]},#{data_mr}"
            map=%Q{
                 function(){
                        #{Mongo::Date.date_format}
                        var v={count:1,total:parseFloat(this.value)}
                        emit({#{mr_condition[:map_group]}},v);
                    };
              }
          else
            mr_condition[:map_group] = "property:"+'this.a'+self.parameter.x_group[:value][0].to_s
            map=%Q{
                 function(){
                        var v={count:1,total:parseFloat(this.value)}
                        emit({#{mr_condition[:map_group]}},v);
                    };
              }

          end

          self.data= query.map_reduce(map, reduce).out(inline: true).finalize(finalize)
        elsif self.parameter.x_group[:type]==XGroupType::ENTITY_GROUP

          self.parameter.x_group[:value].each do |eg_id|
            eg=EntityGroup.find_by_id(eg_id)
            if eg
              entities=eg.entities.collect { |e| e.id }
              query=query.in(entity_id: entities)

              mr_condition[:map_group] = "value:1"
              map=%Q{
                 function(){
                        var v={count:1,total:parseFloat(this.value)}
                        emit({#{mr_condition[:map_group]}},v);
                    };
              }

              data=query.map_reduce(map, reduce).out(inline: true).finalize(finalize)

p data.first
              self.current[eg.name]= data.first.nil? ?  0 :KpiUnit.parse_entry_value(self.parameter.kpi.unit, data.first['value']['value'])
            end
          end

        end
        return aggregate_type_data
      end

      private
      def aggregate_type_data
        p '**********************************'
        p self.parameter.x_group[:type]
        p '**********************************'
        if self.parameter.x_group[:type]==XGroupType::DATE || self.parameter.x_group[:type]==XGroupType::PROPERTY

          date_parse_proc=KpiFrequency.parse_short_string_to_date(self.parameter.frequency)
          if self.parameter.kpi.is_calculated && !self.parameter.property.blank?
            data={}
            self.data.each do |d|
              p d
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
          elsif self.parameter.entity_group_single_entity
            self.data.each do |d|
              p d
              key= self.parameter.x_group[:type]==XGroupType::DATE ? "#{date_parse_proc.call(d['_id']['date'])}##{d['_id']['entity_id'].to_i}" : d['_id']['property']
              self.current[key]=d['value']
            end
          else
            self.data.each do |d|
              p d
              key= self.parameter.x_group[:type]==XGroupType::DATE ? date_parse_proc.call(d['_id']['date']) : d['_id']['property']

              self.current[key]=d['value']['value']
            end
          end
        end

        self.data_module= {:current => self.current,
                           :target_max => self.target_max,
                           :target_min => self.target_min,
                           :unit => self.unit}
        if self.parameter.entity_group_single_entity
          self.current.each do |key, value|
            p key
            if value.is_a?(Hash)
              value['value']=KpiUnit.parse_entry_value(self.parameter.kpi.unit, value['value'])
              value['entity_id']=key.split('#')[1]
            end
          end
        else
          self.current.each { |key, value| self.current[key]=KpiUnit.parse_entry_value(self.parameter.kpi.unit, value) }
        end


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


        @target_max_current=self.parameter.kpi.target_max
        @target_min_current=self.parameter.kpi.target_min
        frequency=self.parameter.frequency

        start_time=self.parameter.start_time
        end_time=self.parameter.end_time

        if self.parameter.x_group[:type]==XGroupType::DATE
          case frequency
            when KpiFrequency::Hourly, KpiFrequency::Daily, KpiFrequency::Weekly
              case frequency
                when KpiFrequency::Hourly
                  step=3600 #60*60
                when KpiFrequency::Daily
                  step=1.day #60*60*24
                  start_time=start_time.localtime.at_beginning_of_day.utc
                  end_time=end_time.localtime.at_beginning_of_day.utc
                # start_time+=8.hours
                # end_time+=8.hours
                when KpiFrequency::Weekly
                  start_time+=8.hours
                  end_time+=8.hours
                  step=7.days #60*60*24*7
                  start_time=Date.parse(start_time.to_s)
                  end_time=Date.parse(end_time.to_s)
                  start_time=Time.parse(Date.commercial(start_time.year, start_time.cweek, 1).to_s).utc
                  end_time=Time.parse(Date.commercial(end_time.year, end_time.cweek, 1).to_s).utc
              end
              while start_time<=end_time do
                next_time=start_time+step
                generate_init_data(start_time)
                # puts "$$$$#{self.current}"
                start_time=next_time
              end
            when KpiFrequency::Monthly
              start_time+=8.hours
              end_time+=8.hours

              start_time=Time.parse(Date.new(start_time.year, start_time.month, 1).to_s).utc
              end_time=Time.parse(Date.new(end_time.year, end_time.month, 1).to_s).utc

              while start_time<=end_time do
                if start_time.month==1
                  next_time=start_time+(start_time.year.leap? ? 29.days : 28.days) #(60*60*24*29 : 60*60*24*28)
                else
                  next_time=start_time+([2, 4, 6, 7, 9, 11, 12].include?(start_time.month) ? 31.days : 30.days) #(60*60*24*31 : 60*60*24*30)
                end
                generate_init_data(start_time)
                start_time=next_time
              end
            when KpiFrequency::Quarterly
              start_time+=8.hours
              end_time+=8.hours

              step_arr=[90, 91, 92, 92]
              start_time=Time.parse(Date.new(start_time.year, (start_time.month-1)/3*3+1, 1).to_s).utc
              end_time=Time.parse(Date.new(end_time.year, (end_time.month-1)/3*3+1, 1).to_s).utc

              while start_time<=end_time do
                if start_time.month==12
                  next_time=start_time+((start_time.year+1).leap? ? (step_arr[0]+1).days : step_arr[0].days)
                else
                  next_time=start_time+step_arr[(start_time.month-1)/3+1].days
                end
                generate_init_data(start_time)
                start_time=next_time
              end
            when KpiFrequency::Yearly
              start_time+=8.hours
              end_time+=8.hours

              start_time=Time.parse(Date.new(start_time.year, 1, 1).to_s).utc

              end_time=Time.parse(Date.new(end_time.year, 1, 1).to_s).utc

              while start_time<=end_time do
                next_time=start_time+((start_time.year+1).leap? ? 366.days : 365.days)
                generate_init_data(start_time)
                start_time=next_time
              end
          end
        elsif self.parameter.x_group[:type]==XGroupType::ENTITY_GROUP
          self.parameter.x_group[:value].each do |v|
            if eg=EntityGroup.find_by_id(v)
              generate_init_data(eg.name)
            end
          end
        elsif self.parameter.x_group[:type]==XGroupType::PROPERTY
          values=[]
          p self.parameter.property
          if self.parameter.property.present? && self.parameter.property['a'+self.parameter.x_group[:value][0].to_s].present?
            values=self.parameter.property['a'+self.parameter.x_group[:value][0].to_s]
          else
            values= KpiProperty.find_by_id(self.parameter.x_group[:value][0]).kpi_property_values.pluck(:value)
          end
          values.each { |v| generate_init_data(v) }
        end
      end

      def generate_init_data(key)
        if self.parameter.entity_group_single_entity
          self.parameter.entities.each do |id|
            k="#{key}##{id}"
            self.current[k]={
                'entity_id' => id,
                'count' => 0,
                'total' => 0,
                'value' => 0
            }
            self.target_max[key]=@target_max_current
            self.target_min[key]=@target_min_current
            self.unit[key]= @kpi_uni_sym
          end
        else
          self.current[key]=0
          self.target_max[key]=@target_max_current
          self.target_min[key]=@target_min_current
          self.unit[key]= @kpi_uni_sym
        end
      end

      def generate_web_highstock_data
        web_highstock_data={}
        self.data_module.each { |k, v| web_highstock_data[k]=v.kind_of?(Hash) ? v.values : v }
        web_highstock_data[:date]=self.current.keys.map { |k| self.parameter.x_group[:type]==XGroupType::DATE ? k.to_time.utc.to_s : k }
        return web_highstock_data
      end

      def self.new_hash(n=0)
        Array.new(n) { Hash.new }
      end
    end
  end
end

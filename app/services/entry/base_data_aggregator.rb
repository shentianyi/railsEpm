module Entry
  class BaseDataAggregator
    attr_accessor :condition, :data_module

    attr_accessor :current, current_count, target_max, target_min, unit, frequency, total, average

    def initialize(condition)
      self.condition =condition
      self.init_data_module
    end

    def aggregate
      query_condition=Entry::ConditionService.new(self.condition).build_base_query_condition
      entries=Entry::QueryService.new.base_query(query_condition[:base], query_condition[:property]).where(entry_type: 1)
      # group entry by date
      entries.each do |entry|
        self.frequency.each do |k, v|
          if entry.parsed_entry_at >=v[0] && entry.parsed_entry_at < v[1]
            self.current[k]=(self.current[k]||0) +entry.value
            self.current_count[k]+=1 unless self.current[k]
            self.total+=entry.value
          end
        end
      end
      # do average
      if self.condition.reduce
        self.current.each do |k, v|
          self.current[k]=(v/(self.current_count[k]==0 ? 1 : self.current_count[k])).round(2)
        end
      else
        self.current.each do |k, v|
          self.current[k]=(v/(self.current_count[k]==0 ? 1 : self.current_count[k])).round(2)
        end
      end if self.condition.average
      # clean values
      self.current.each { |key, value| self.current[key]=KpiUnit.parse_entry_value(self.condition.kpi.unit, value) }
      self.data_module= {:current => self.current,
                         :target_max => self.target_max,
                         :target_min => self.target_min,
                         :unit => self.unit,
                         :total => KpiUnit.parse_entry_value(self.condition.kpi.unit, self.total.to_f),
                         :average => self.current.size==0 ? 0 : (total/self.condition.entities.size/self.current.size).round(2).to_f}
    end


    private
    def init_data_module
      self.total=self.average =0
      frequency=self.condition.frequency
      start_time=self.condition.start_time
      end_time=self.condition.end_time

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
            generate_init_frequency(start_time, next_time)
            start_time=next_time
          end
        when KpiFrequency::Monthly
          while start_time<=end_time do
            if start_time.month==2
              next_time=start_time+(start_time.year.leap? ? 2505600 : 2419200) #(60*60*24*29 : 60*60*24*28)
            else
              next_time=start_time+([1, 3, 5, 7, 8, 10, 12].include?(start_time.month+1) ? 2678400 : 2592000) #(60*60*24*31 : 60*60*24*30)
            end
            generate_init_frequency(start_time, next_time)
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
            generate_init_frequency(start_time, next_time)
            start_time=next_time
          end
        when KpiFrequency::Yearly
          while start_time<=end_time do
            next_time=start_time+((start_time.year+1).leap? ? 31622400 : 31536000)
            generate_init_frequency(start_time, next_time)
            start_time=next_time
          end
      end
    end

    def generate_init_frequency(start_time, next_time)
      key=start_time.to_s
      self.current[key]=nil
      self.current_count[key]=self.target_max[key]=self.target_min[key]=0
      self.unit=self.condition.kpi.unit
      self.frequency[key]=[start_time, next_time]
    end

    def aggregate_type_data
      case self.condition.data_module
        when DataModule::WEB_HIGHSTOCK
          return self.data_module
        when DataModule::IOS_TABLE

        else
          return nil
      end
    end
  end
end
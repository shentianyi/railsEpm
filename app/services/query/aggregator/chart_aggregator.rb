module Query
  module Aggregator
    class ChartAggregator<BaseAggregator

      def initialize(params)
        self.data={}
        self.parameter=Query::Parameter::Parameter.new(params)
        self.init_data
      end


      def clean_data
        date_parse_proc=KpiFrequency.parse_short_string_to_date(self.parameter.frequency)
        self.query_data.each do |d|
          puts '-----****'
          puts d['_id']['date']
          key=date_parse_proc.call(d['_id']['date'])

          puts key
          puts d['value']
          puts '-----****'

          v=d['value']
          date=date_parse_proc.call(d['_id']['date'])


          puts '777777777'
          puts           date

          puts           date.class
          puts '88888888'
          if self.data[date]


            puts '7779999777777'
            puts           date

            puts           date.class
            puts '8888888000008'

            self.data[date].value =KpiUnit.parse_entry_value(self.parameter.kpi.unit, v)
            self.data[date].value_text=KpiUnit.get_value_display(self.parameter.kpi.unit, v)
          end
        end

        self.data=self.data.values
      end


      def init_data
        frequency=self.parameter.frequency
        from_time=self.parameter.from_time
        end_time=self.parameter.end_time
        @upper_boundary_text=KpiUnit.get_value_display(self.parameter.kpi.unit, self.parameter.upper_boundary)
        @lower_boundary_text=KpiUnit.get_value_display(self.parameter.kpi.unit, self.parameter.lower_boundary)


        puts '---------------------------'
        puts from_time
        puts end_time
        puts '-----------------------------'

        case frequency
          when KpiFrequency::Hourly, KpiFrequency::Daily, KpiFrequency::Weekly
            case frequency
              when KpiFrequency::Hourly
                step=1.hour
                from_time=from_time.at_beginning_of_hour.to_time
                end_time=end_time.at_beginning_of_hour.to_time
              when KpiFrequency::Daily
                step=1.day
                from_time=from_time.at_beginning_of_day.to_time
                end_time=end_time.at_beginning_of_day.to_time
              when KpiFrequency::Weekly
                step=7.days
                from_time=Date.parse(from_time.to_s)
                end_time=Date.parse(end_time.to_s)
                from_time=Time.parse(Date.commercial(from_time.year, from_time.cweek, 1).to_s).utc
                end_time=Time.parse(Date.commercial(end_time.year, end_time.cweek, 1).to_s).utc


                puts '---------------------------'
                puts from_time
                puts end_time
                puts '-----------------------------'
            end
            while from_time<=end_time do
              next_time=from_time+step
              init_data_item(from_time)
              from_time=next_time
            end
          when KpiFrequency::Monthly
            from_time=Time.parse(Date.new(from_time.year, from_time.month, 1).to_s).utc
            end_time=Time.parse(Date.new(end_time.year, end_time.month, 1).to_s).utc

            while from_time<=end_time do
              if from_time.month==1
                next_time=from_time+(from_time.year.leap? ? 29.days : 28.days)
              else
                next_time=from_time+([2, 4, 6, 7, 9, 11, 12].include?(from_time.month) ? 31.days : 30.days)
              end
              init_data_item(from_time)
              from_time=next_time
            end
          when KpiFrequency::Quarterly
            step_arr=[90, 91, 92, 92]
            from_time=Time.parse(Date.new(from_time.year, (from_time.month-1)/3*3+1, 1).to_s).utc
            end_time=Time.parse(Date.new(end_time.year, (end_time.month-1)/3*3+1, 1).to_s).utc

            while from_time<=end_time do
              if from_time.month==12
                next_time=from_time+((from_time.year+1).leap? ? (step_arr[0]+1).days : step_arr[0].days)
              else
                next_time=from_time+step_arr[(from_time.month-1)/3+1].days
              end
              init_data_item(from_time)
              from_time=next_time
            end
          when KpiFrequency::Yearly
            from_time=Time.parse(Date.new(from_time.year, 1, 1).to_s).utc
            end_time=Time.parse(Date.new(end_time.year, 1, 1).to_s).utc
            while from_time<=end_time do
              next_time=from_time+((from_time.year+1).leap? ? 366.days : 365.days)
              init_data_item(from_time)
              from_time=next_time
            end
        end
      end


      def init_data_item(date_time)
        puts date_time
        self.data[date_time]=Query::Data::ChartData.new(
            date_time: date_time.to_s,
            value: nil,
            value_text: nil,
            upper_boundary: self.parameter.upper_boundary,
            lower_boundary: self.parameter.lower_boundary,
            upper_boundary_text: @upper_boundary_text,
            lower_boundary_text: @lower_boundary_text,
            over_upper_boundary: false,
            over_lower_boundary: false
        )
      end

    end
  end
end
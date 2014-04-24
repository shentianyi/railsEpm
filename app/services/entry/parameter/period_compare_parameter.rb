module Entry
  module Parameter
    class PeriodCompareParameter<AnalyseParameter

      attr_accessor :base_time, :compare_times, :compare_size

      def initialize(args)
        self.base_time=args[:base_time] if args[:base_time]
        self.compare_size=args[:compare_size] || 1
        self.compare_times =nil
        super
      end

      def base_time=(value)
        @base_time={
            start_time: Time.parse(value[:start_time]).utc,
            end_time: Time.parse(value[:end_time]).utc
        }
      end

      def compare_times=(value)
        return compare_times if @compare_times
        @compare_times=[]
        1.upto(self.compare_size).each do |i|
          @compare_times<<{
              start_time: self.base_time[:start_time]-i.year,
              end_time: self.base_time[:end_time]-i.year
          }
        end
        return @compare_times
      end

      def compare_size=(value)
        @compare_size=value.to_i
      end

      def base_query_condition
        {kpi_id: self.kpi.id,
         entity_id: self.entities}
      end


      def times
        times=[]
        times<<self.base_time if self.base_time
        self.compare_times.each do |t|
          times<<t
        end
        return times
      end

      def clean_property_values(properties)
        if self.property
          property.each do |k,v|
            key=k.sub(/a/,'').to_i
            properties[key]=v if properties.has_key?(key)
          end
        end
      end

      def build_or_condition
        conditions=[]
        self.times.each do |t|
          conditions<<{parsed_entry_at: t[:start_time]..t[:end_time]}
        end
        return conditions
      end
    end
  end
end
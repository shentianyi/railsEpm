module Entry
  module Parameter
    class PeroidCompareParameter

      attr_accessor :base_time, :compare_times

      def initialize(args)
        self.base_time=args[:base_time] if args[:base_time]
        self.compare_times =args[:compare_times]
        super
      end

      def base_time=(value)
        @base_time={
            start_time: Time.parse(value[:start_time]).utc,
            end_time: Time.parse(value[:end_time]).utc
        }
      end

      def compare_times=(values)
        @comapre_times=[]
        values.each do |v|
          @comapre_times<<{
              start_time: Time.parse(v[:start_time]).utc,
              end_time: Time.parse(v[:end_time]).utc
          }
        end
      end

      def base_query_condition
        {kpi_id: self.kpi.id,
         entity_id: self.entities}
      end

      def build_or_condition
        conditions=[]
        conditions<<{parsed_entry_at: self.base_time[:start_time]..self.base_time[:end_time]} if self.base_time
        self.compare_times.each do |t|
          conditions<<{parsed_entry_at: t[:start_time]..t[:end_time]}
        end
        return conditions
      end
    end
  end
end
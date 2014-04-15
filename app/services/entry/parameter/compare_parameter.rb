module Entry
  module Parameter
    class PeroidCompareParameter

      attr_accessor :base_time, :compare_time

      def initialize(args)
        self.base_time=args[:base_time]
        self.compare_time =args[:compare_time]
        super
      end

      def base_time=(value)
        @base_time={
            start_time: Time.parse(value[:start_time]).utc,
            end_time: Time.parse(value[:end_time]).utc
        }
      end

      def compare_time=(value)
        @comapre_time={
            start_time: Time.parse(value[:start_time]).utc,
            end_time: Time.parse(value[:end_time]).utc
        }
      end

      def base_query_condition
        {kpi_id: self.kpi.id,
         entity_id: self.entities}
      end

      def build_or_condition
        [@base_time, @comapre_time]
      end
    end
  end
end
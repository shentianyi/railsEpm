module Entry
  module Parameter
    class AnalyseParameter
      attr_accessor :kpi, :entities, :property
      attr_accessor :start_time, :end_time
      attr_accessor :frequency
      attr_accessor :average, :reduce, :data_module # sum,average
      attr_accessor :valid

      def initialize(args)
        self.kpi=Kpi.find(args[:kpi_id])
        self.entities = EntityGroup.find(args[:entity_group_id]).entities.pluck(:id)

        # args:start_time, end_time arg utc-time-string
        self.start_time =args[:start_time]
        self.end_time = args[:end_time]
        self.frequency=args[:frequency] || self.kpi.frequency
        self.average=args[:average]
        self.reduce = args[:reduce]
        self.data_module = args[:data_module] || DataService::WEB_HIGHSTOCK
        self.property = args[:property]
        self.valid=false
      end

      def start_time=(value)
        @start_time=Time.parse(value).utc
      end

      def end_time=(value)
        @end_time=Time.parse(value).utc
      end


      def frequency=(value)
        @frequency=value.to_i
      end

      def data_module=(value)
        @data_module=value.to_i
      end

      def average=(value)
        @average=AnalyseParameter.is_true(value)
      end

      def reduce=(value)
        @reduce= AnalyseParameter.is_true(value)
      end

      def validate

      end

      def self.is_true(value, default=true)
        return default if value.nil?
        return value=='true' || value=='1' if value.is_a?(String)
        return value if value.is_a?(TrueClass) || value.is_a?(FalseClass)
      end
    end
  end
end
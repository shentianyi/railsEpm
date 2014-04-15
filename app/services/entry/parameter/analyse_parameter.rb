module Entry
  module Parameter
    class AnalyseParameter
      attr_accessor :kpi, :entities, :property
      attr_accessor :start_time, :end_time
      attr_accessor :frequency
      attr_accessor :average, :reduce, :data_module # sum,average
      attr_accessor :valid
      attr_accessor :map_group, :reduce_func

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
        self.map_group =args[:map_group] if args[:map_group]
        self.reduce_func=args[:reduce_func] if args[:reduce_func]
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

      def date_format
       return case self.frequency
               when KpiFrequency::Hourly
                 'yyyy-MM-dd HH'
               when KpiFrequency::Daily
                 'yyyy-MM-dd'
               when KpiFrequency::Weekly
                 'yyyy-WW'
               when KpiFrequency::Monthly
                 'yyyy-MM'
               when KpiFrequency::Quarterly
                 'yyyy-qq'
               when KpiFrequency::Yearly
                 'yyyy'
             end
      end

      def validate

      end


      def self.is_true(value, default=true)
        return default if value.nil?
        return value=='true' || value=='1' if value.is_a?(String)
        return value if value.is_a?(TrueClass) || value.is_a?(FalseClass)
      end

      def base_query_condition
        {kpi_id: self.kpi.id,
         entity_id: self.entities,
         parsed_entry_at: self.start_time..self.end_time}
      end

      def map_reduce_condition
        {map_group: "#{self.map_group.map { |k, v| k+':this.'+v }.join(',')}", reduce_func: self.reduce_func}
      end
    end
  end
end
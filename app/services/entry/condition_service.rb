module Entry
  class ConditionService
    attr_accessor :condition

    def initialize(condition)
      self.condition=condition
    end

    # params include: kpi, entities
    # start_time(utc),end_time(utc)
    # function(sum,average)
    # kpi_frequency
    def build_base_query_condition
      {base: base_condition, property: self.condition.property}
    end

    private
    def base_condition
      {kpi_id: self.condition.kpi.id,
       entity_id: self.condition.entities,
       start_time: self.condition.start_time,
       end_time: self.condition.end_time}
    end
  end

  class AnalyseCondition
    attr_accessor :kpi, :entities, :property
    attr_accessor :start_time, :end_time
    attr_accessor :frequency
    attr_accessor :average, :reduce, :data_module # sum,average
    attr_accessor :valid

    def initialize(args)
      self.kpi=Kpi.find(args[:kpi])
      self.entities = EntityGroup.find(args[:entity_group]).entities.pluck(:id)

      # args:start_time, end_time arg utc-time-string
      self.start_time =args[:start_time]
      self.end_time = args[:end_time]

      self.frequency=args[:frequency] || self.kpi.frequency
      self.average=args[:average] || true
      self.reduce = args[:reduce]||true
      self.data_module = args[:data_module] || Entry::DataModule::WEB_HIGHSTOCK_IOS_TABLE
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

    def data_module(value)
      @data_module=value.nil?
    end

    def average=(value)
      @average=value.class.is_a?(String) ? value=='true' : value
    end

    def reduce=(value)
      @reduce= value.class.is_a?(String) ? value=='true' : value
    end

    def validate

    end
  end
end
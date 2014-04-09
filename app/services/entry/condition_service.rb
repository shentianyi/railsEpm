module Entry
  class ConditionService
    # params include: kpi, entity_group
    # start_time(utc),end_time(utc)
    # function(sum,average)
    # kpi_frequency
    def init_query_condition params

    end

    def validate_query_condition params

    end

  end

  class Parameter
    attr_accessor :kpi, :entity_group
    attr_accessor :start_time, :end_time
    attr_accessor :frequency, :query_frequency

    def start_time=(value)
      @start_time=Time.parse(value).utc
    end

    def end_time=(value)
      @end_time=Time.parse(value).utc
    end
  end
end
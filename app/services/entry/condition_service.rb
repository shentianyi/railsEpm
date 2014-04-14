module Entry
  class ConditionService
    attr_accessor :parameter

    def initialize(parameter)
      self.parameter=parameter
    end

    # params include: kpi, entities
    # start_time(utc),end_time(utc)
    # function(sum,average)
    # kpi_frequency
    def build_base_query_condition
      {base: self.parameter.base_query_condition, property: self.parameter.property}
    end

  end
end
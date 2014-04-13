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
      {base: base_condition, property: self.parameter.property}
    end

    private
    def base_condition
      {kpi_id: self.parameter.kpi.id,
       entity_id: self.parameter.entities,
       parsed_entry_at: self.parameter.start_time..self.parameter.end_time}
    end
  end
end
#encoding: utf-8
class KpiPresenter<Presenter
  Delegators=[:id, :name, :is_calculated,:formula_string,:frequency,:direction,:unit,:target_max,:target_min,:description,:kpi_property_items]
  def_delegators :@kpi,*Delegators

  def initialize(kpi)
    @kpi=kpi
    self.delegators =Delegators
  end

  def properties
    attrs = []
    @kpi.kpi_property_items.each {|item|
      attrs << {id:item.id,name:item.kpi_property.name}
    }
    attrs
  end

  def to_json
    {
        id: @kpi.id,
        name: @kpi.name,
        is_calculated: @kpi.is_calculated,
        formula_string: @kpi.formula_string,
        interval: KpiFrequency.get_desc_by_value(@kpi.frequency),
        trend:  KpiDirection.get_desc_by_value(@kpi.direction),
        target_max: KpiUnit.parse_entry_value(@kpi.unit, @kpi.target_max),
        target_min: KpiUnit.parse_entry_value(@kpi.unit, @kpi.target_min),
        section: KpiUnit.get_entry_unit_sym(@kpi.unit),
        desc: @kpi.description,
        properties: properties
    }
  end
end
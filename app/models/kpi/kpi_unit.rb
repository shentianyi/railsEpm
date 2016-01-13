#encoding: utf-8
class KpiUnit
  include Enum
  KpiUnit.define :IntUnit, 100, '1234'
  KpiUnit.define :FloatUnit, 200, '12.34'
  KpiUnit.define :IntPercentUnit, 300, '12%'
  KpiUnit.define :FloatPercentUnit, 400, '12.34%'
  # get kpi entry parsed value by unit
  def self.parse_entry_value unit, value
    return case unit
             when KpiUnit::IntUnit, KpiUnit::IntPercentUnit
               value.round.to_i
             when KpiUnit::FloatUnit, KpiUnit::FloatPercentUnit
               value.round(2).to_f
             else
               value
           end
  end

  # get kpi entry unit sym
  def self.get_entry_unit_sym unit
    return case unit
             when KpiUnit::IntUnit, KpiUnit::FloatUnit
               ''
             when KpiUnit::IntPercentUnit, KpiUnit::FloatPercentUnit
               '%'
             else
               ''
           end
  end

  def self.get_value_display unit,value
    value=parse_entry_value(unit,value)
    "#{value}#{get_entry_unit_sym(unit)}"
  end

  def self.get_desc_by_value value
    return case value
             when 100
               'INT'
             when 200
               'FLOAT'
             when 300
               'INT PERCENT'
             when 400
               'FLOAT PERCENT'
           end
  end
end

#encoding: utf-8
class KpiUnit
  include Enum
  KpiUnit.define :IntUnit,100,'1234'
  KpiUnit.define :FloatUnit,200,'12.34'
  KpiUnit.define :IntPercentUnit,300,'12%'
  KpiUnit.define :FloatPercentUnit,400,'12.34%'
  # get kpi entry parsed value by unit
  def self.parse_entry_value unit,value
    return case unit
    when KpiUnit::IntUnit,KpiUnit::IntPercentUnit
      value.round
    when KpiUnit::FloatUnit,KpiUnit::FloatPercentUnit
      value
    end
  end

  # get kpi entry unit sym
  def self.get_entry_unit_sym unit
    return case unit
    when KpiUnit::IntUnit,KpiUnit::FloatUnit
      ''
    when KpiUnit::IntPercentUnit,KpiUnit::FloatPercentUnit
      '%'
    else
    ''
    end
  end
end

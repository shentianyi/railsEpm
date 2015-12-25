#encoding: utf-8
class KpiCalculate
  include Enum
  KpiCalculate.define :Average, 0, 'Sum'
  KpiCalculate.define :Sum, 1, 'Average'

  def self.get_operator(cal)
    case cal
      when KpiCalculate::Average
        'avg'
      when KpiCalculate::Sum
        'sum'
      else
        'sum'
    end
  end
end
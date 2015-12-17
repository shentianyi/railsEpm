#encoding: utf-8
class KpiCalculate
  include Enum
  KpiCalculate.define :Sum, 0, 'Sum'
  KpiCalculate.define :Average, 1, 'Average'
end
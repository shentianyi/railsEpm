#encoding: utf-8
class KpiCalculate
  include Enum
  KpiCalculate.define :Sum, 100, 'Sum'
  KpiCalculate.define :Average, 200, 'Average'
end
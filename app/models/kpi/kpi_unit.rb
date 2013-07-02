#encoding: utf-8
class KpiUnit
  include EnumBase
  KpiUnit.define :Int,100,'1234'
  KpiUnit.define :Float,200,'12.34'
  KpiUnit.define :IntPercent,300,'12%'
  KpiUnit.define :FloatPercent,400,'12.34%'

end

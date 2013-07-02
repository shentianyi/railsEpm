#encoding: utf-8
class KpiDirection
  include EnumBase
  KpiDirection.define :Int,100,'1234'
  KpiDirection.define :Float,200,'12.34'
  KpiDirection.define :IntPercent,300,'12%'
  KpiDirection.define :FloatPercent,400,'12.34%'

end

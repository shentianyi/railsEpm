#encoding: utf-8
class KpiDirection
  include EnumBase
  KpiDirection.define :None,100,'None'
  KpiDirection.define :Up,200,'Up'
  KpiDirection.define :Down,300,'Down'

end

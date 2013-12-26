#encoding: utf-8
class KpiDirection
  include Enum
  KpiDirection.define :None,100,(I18n.t 'manage.kpi.trend_item.none')
  KpiDirection.define :Up,200,(I18n.t 'manage.kpi.trend_item.up')
  KpiDirection.define :Down,300, (I18n.t 'manage.kpi.trend_item.down')

end

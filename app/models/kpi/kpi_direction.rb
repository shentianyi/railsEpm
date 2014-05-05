#encoding: utf-8
class KpiDirection
  include Enum
  KpiDirection.define :None, 100, (I18n.t 'manage.kpi.trend_item.none')
  KpiDirection.define :Up, 200, (I18n.t 'manage.kpi.trend_item.up')
  KpiDirection.define :Down, 300, (I18n.t 'manage.kpi.trend_item.down')


  def i18nt_desc
    KpiDirection.get_by_value(self.value)
  end

  def self.get_desc_by_value value
    return case value
             when 100
               I18n.t 'manage.kpi.trend_item.none'
             when 200
               I18n.t 'manage.kpi.trend_item.up'
             when 300
               I18n.t 'manage.kpi.trend_item.down'
           end
  end
end

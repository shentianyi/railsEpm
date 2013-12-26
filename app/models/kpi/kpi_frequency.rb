#encoding: utf-8
class KpiFrequency
  include Enum
  
  KpiFrequency.define :Hourly,90, (I18n.t 'manage.kpi.freq_item.hourly')
  KpiFrequency.define :Daily,100, (I18n.t 'manage.kpi.freq_item.daily')
  KpiFrequency.define :Weekly,200, (I18n.t 'manage.kpi.freq_item.weekly')
  KpiFrequency.define :Monthly,300, (I18n.t 'manage.kpi.freq_item.monthly')
  KpiFrequency.define :Quarterly,400, (I18n.t 'manage.kpi.freq_item.quarterly')
  KpiFrequency.define :Yearly,500, (I18n.t 'manage.kpi.freq_item.yearly')

end
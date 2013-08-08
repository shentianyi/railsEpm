#encoding: utf-8
class KpiFrequency
  include Enum
  
  KpiFrequency.define :Hourly,90,'Hourly'
  KpiFrequency.define :Daily,100,'Daily'
  KpiFrequency.define :Weekly,200,'Weekly'
  KpiFrequency.define :Monthly,300,'Monthly'
  KpiFrequency.define :Quarterly,400,'Quarterly'
  KpiFrequency.define :Yearly,500,'Yearly'

end
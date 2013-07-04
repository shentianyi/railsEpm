#encoding: utf-8
class KpiFrequency
  include Enum
  KpiFrequency.define :Hourly,90,'Hourly'
  KpiFrequency.define :Daily,100,'Daily'
  KpiFrequency.define :Weekly,200,'Weekly'
  KpiFrequency.define :Monthly,300,'Monthly'
  KpiFrequency.define :Quarterly,400,'Quarterly'
  KpiFrequency.define :Yearly,500,'Yearly'
  
  # # get kpi entry parsed entry date by frequency
  # def self.parse_entry_date frequency,entry_at
    # return case frequency
    # when 90
      # DateTimeHelper.parse_string_to_date_hour(entry_at)
    # when KpiFrequency::Daily
      # DateTimeHelper.parse_string_to_date_hour(entry_at)
    # when KpiFrequency::Weekly
      # DateTimeHelper.parse_week_string_to_date_hour(entry_at)
    # when KpiFrequency::Quarterly
      # DateTimeHelper.parse_quarter_string_to_date_hour(entry_at)
    # when KpiFrequency::Yearly
      # DateTimeHelper.parse_year_string_to_date_hour(entry_at)
    # end
  # end
  
  
end
#encoding: utf-8
class KpiFrequency
  include Enum

  KpiFrequency.define :Hourly, 90, (I18n.t 'manage.kpi.freq_item.hourly')
  KpiFrequency.define :Daily, 100, (I18n.t 'manage.kpi.freq_item.daily')
  KpiFrequency.define :Weekly, 200, (I18n.t 'manage.kpi.freq_item.weekly')
  KpiFrequency.define :Monthly, 300, (I18n.t 'manage.kpi.freq_item.monthly')
  KpiFrequency.define :Quarterly, 400, (I18n.t 'manage.kpi.freq_item.quarterly')
  KpiFrequency.define :Yearly, 500, (I18n.t 'manage.kpi.freq_item.yearly')


  def self.parse_short_string_to_date(frequency)
    return case frequency
             when KpiFrequency::Hourly, KpiFrequency::Daily
               Proc.new { |v| Time.parse(v).utc }
             when KpiFrequency::Weekly
               Proc.new { |v|
                 arr=v.split('-').map(&:to_i)
                 Time.parse(Date.commercial(arr[0], arr[1], 1).to_s).utc
               }
             when KpiFrequency::Monthly
               Proc.new { |v|
                 arr=v.split('-').map(&:to_i)
                 Time.parse(Date.new(arr[0], arr[1]).to_s).utc
               }
             when KpiFrequency::Quarterly
               Proc.new { |v|
                 arr=v.split('-').map(&:to_i)
                 Time.parse(Date.new(arr[0], arr[1]*3-2).to_s).utc
               }
             when KpiFrequency::Yearly
               Proc.new { |v| Time.parse("#{v}-01-01").utc }
           end
  end

  def self.get_next_date(date, frequency)
    date=Time.parse(date) if date.is_a?(String)
    return case frequency.to_i
             when KpiFrequency::Hourly
               date+1.hour
             when KpiFrequency::Daily
               date+1.day
             when KpiFrequency::Weekly
               date+1.week
             when KpiFrequency::Monthly
               date+1.month
             when KpiFrequency::Quarterly
               date+4.months
             when KpiFrequency::Yearly
               date+1.year
           end
  end


  def i18nt_desc
    KpiFrequency.get_by_value(self.value)
  end

  def self.get_desc_by_value value
    return case value
             when 90
               I18n.t 'manage.kpi.freq_item.hourly'
             when 100
               I18n.t 'manage.kpi.freq_item.daily'
             when 200
               I18n.t 'manage.kpi.freq_item.weekly'
             when 300
               I18n.t 'manage.kpi.freq_item.monthly'
             when 400
               I18n.t 'manage.kpi.freq_item.quarterly'
             when 500
               I18n.t 'manage.kpi.freq_item.yearly'
           end
  end
end
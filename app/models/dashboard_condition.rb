class DashboardCondition < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :dashboard_item
  attr_accessible :dashboard_item_id,:entity_group,:kpi_id,:calculate_type,:time_string,:count

  validates_with TimeStringValidator
  #validates :dashboard_item_id,:presence => true
  validates :entity_group,:presence => true
  validates :kpi_id,:presence => true
  validates :calculate_type,:presence => true

  #
  # move from DashboardItem::get_item_formatted_data(id)
  # return the array of conditions
  #
  def self.get_item_formatted_data(id)
    datas = []
    dashboard_itme = DashboardItem.find(id)
    conditions = DashboardCondition.where('dashboard_item_id=?',id)

    if conditions
      conditions.each { |condition|

        time_span = DashboardItem.time_string_to_time_span condition.time_string

        count = time_range_count(time_span[:start].iso8601.to_s,time_span[:end].iso8601.to_s,dashboard_itme.interval)
        if count > 150
          return datas
        end

        data = KpiEntryAnalyseHelper::get_kpi_entry_analysis_data(
            condition.kpi_id,
            condition.entity_group,
            time_span[:start].iso8601.to_s,
            time_span[:end].iso8601.to_s,
            condition.calculate_type=='AVERAGE')

        if data
          data[:result]=true

          start_time = time_span[:start]
          if start_time.utc?
            start_time = start_time.localtime
          end

          end_time = time_span[:end]
          if end_time.utc?
            end_time = end_time.localtime
          end

          data[:startTime] = start_time
          data[:endTime] = end_time

          data[:interval] = Kpi.find_by_id(condition.kpi_id).frequency.to_s
          data[:kpi_id] = condition.kpi_id
          data[:kpi_name] = Kpi.find(condition.kpi_id).name
          data[:count] = condition.count
          data[:id] = condition.id
          datas << data
        end
      }
    end

    return datas
  end


  def self.time_by_diff_unit(timestr,time_unit)
    result = {}

    localtime = timestr
    if timestr.utc?
      localtime = timestr.localtime
    end

    result = localtime.strftime("%Y-%m-%d 00:00:00")

    if time_unit == "MINUTE"
      result = localtime.strftime("%Y-%m-%d %H:%M:00")
    end
    if time_unit == "HOUR"
      result = localtime.strftime("%Y-%m-%d %H:00:00")
    end
    if time_unit == "DAY"
      result = localtime.strftime("%Y-%m-%d")
    end

    return result
  end

  def self.time_range_count(starttime,endtime,interval)
    startt = Time.parse(starttime).to_i
    endt = Time.parse(endtime).to_i
    case interval
      when KpiFrequency::Hourly
        count = (endt - startt)/(60*60)
      when KpiFrequency::Daily
        count = (endt - startt)/(60*60*24)
      when KpiFrequency::Weekly
        count = (endt -startt)/(60*60*24*7)
      when KpiFrequency::Monthly
        count = (endt - startt)/(60*60*24*30)
      when KpiFrequency::Quarterly
        count = (endt - startt)/(60*60*24*30*4)
      when KpiFrequency::Yearly
        count = (endt - startt)/(60*60*24*365)
    end
  return count
  end
end

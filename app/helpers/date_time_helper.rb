#encoding: utf-8
module DateTimeHelper
  # parse time to hour string
  def self.parse_time_to_hour_string time
    time.strftime('%Y-%m-%d %H:00:00%z')
  end

  # parse string to date hour
  def self.parse_string_to_date_hour str
    # DateTime.strptime(Time.parse(str).to_s,'%Y-%m-%d %H:%M:%S')
    Time.parse(str).utc
  end

  # parse time to day string
  def self.parse_time_to_day_string time
    # time.strftime('%Y-%m-%d %Z')
    Time.at(time.to_i).strftime('%Y-%m-%d %Z')
  end

  # parse time to week string
  def self.parse_time_to_week_string time
    date=Date.parse(parse_time_to_day_string(time))
    week=date.cweek
    week= week>9 ?  week : "0#{week}"
    "#{date.year}-#{week}"
  end

  # parse week string: 2013-20 to date hour
  def self.parse_week_string_to_date_hour str
    arr=str.split('-')
    parse_string_to_date_hour(Date.commercial(arr[0].to_i,arr[1].to_i,1).to_s)
  end

  # parse time to month string
  def self.parse_time_to_month_string time
    month=Time.at(time.to_i).month>9 ? Time.at(time.to_i).month : "0#{Time.at(time.to_i).month}"
    "#{time.year}-#{month}"
  end

  # parse month string: 2013-12 to date hour
  def self.parse_month_string_to_date_hour str
    arr=str.split('-')
    parse_string_to_date_hour(Date.new(arr[0].to_i,arr[1].to_i).to_s)
  end

  # parse time to quarter string
  def self.parse_time_to_quarter_string time
    time=Time.at(time.to_i)
    "#{time.year}-0#{(time.month-1)/3+1}"
  end

  # parse quarter string: 2013-1 to date hour
  def self.parse_quarter_string_to_date_hour str
    arr=str.split('-')
    parse_string_to_date_hour(Date.new(arr[0].to_i,arr[1].to_i*3-2).to_s)
  end

  # parse time to year string
  def self.parse_time_to_year_stirng time
    time=Time.at(time.to_i)
    "#{time.year}"
  end

  # parse year string: 2013 to date hour
  def self.parse_year_string_to_date_hour str
    parse_string_to_date_hour(Date.new(str.to_i).to_s)
  end

  def self.get_utc_time_by_str str
    Time.parse(str).utc
  end
end

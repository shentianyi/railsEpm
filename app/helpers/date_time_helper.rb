#encoding: utf-8
module DateTimeHelper
  # parse time to hour string
  def self.parse_time_to_hour_string time
    time.strftime('%Y-%m-%d %H:00:00')
  end

  # parse string to date hour
  def self.parse_string_to_date_hour str
    DateTime.strptime(Time.parse(str).to_s,'%Y-%m-%d %H:%M:%S')
  end

  # parse time to day string
  def self.parse_time_to_day_string time
    time.strftime('%Y-%m-%d')
  end

  # parse time to week string
  def self.parse_time_to_week_string time
    date=Date.parse(parse_time_to_day_string(time))
    week=date.cweek>9 ? date.cweek : "0#{date.cweek}" 
    "#{date.year}-#{week}"
  end

  # parse week string: 2013-20 to date hour
  def self.parse_week_string_to_date_hour str
    arr=str.split('-')
    parse_string_to_date_hour(Date.commercial(arr[0].to_i,arr[1].to_i,1).to_s)
  end

  # parse time to month string
  def self.parse_time_to_month_string time
    month=time.month>9 ? time.month : "0#{time.month}" 
    "#{time.year}-#{month}"
  end

  # parse month string: 2013-12 to date hour
  def self.parse_month_string_to_date_hour str
    arr=str.split('-')
    parse_string_to_date_hour(Date.new(arr[0].to_i,arr[1].to_i).to_s)
  end

  # parse time to quarter string
  def self.parse_time_to_quarter_string time
    "#{time.year}-0#{(time.month-1)/3+1}"
  end

  # parse quarter string: 2013-1 to date hour
  def self.parse_quarter_string_to_date_hour str
    arr=str.split('-')
    parse_string_to_date_hour(Date.new(arr[0].to_i,arr[1].to_i*3-2).to_s)
  end

  # parse time to year string
  def self.parse_time_to_year_stirng time
    "#{time.year}"
  end

  # parse year string: 2013 to date hour
  def self.parse_year_string_to_date_hour str
    parse_string_to_date_hour(Date.new(str.to_i).to_s)
  end

end

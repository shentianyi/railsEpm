#encoding: utf-8
module DateTimeHelper
  # parse string to date hour
  def self.parse_string_to_date_hour str
    DateTime.strptime(Time.parse(str).to_s,'%Y-%m-%d %H:%M:%S')
  end

  # parse week string: 2013-20 to date hour
  def self.parse_week_string_to_date_hour str
   arr=str.split('-')
   parse_string_to_date_hour(Date.commerial(arr[0].to_i,arr[1].to_i,1).to_s)
  end

  # parse month string: 2013-12 to date hour
  def self.parse_month_string_to_date_hour str
    arr=str.split('-')
    parse_string_to_date_hour(Date.new(arr[0].to_i,arr[1].to_i).to_s)  
  end

  # parse quarter string: 2013-1 to date hour
  def self.parse_quarter_string_to_date_hour str
    arr=str.split('-')
    parse_string_to_date_hour(Date.new(arr[0].to_i,arr[1].to_i*3-2).to_s)
  end

  # parse year string: 2013 to date hour
  def self.parse_year_string_to_date_hour str
   parse_string_to_date_hour(Date.new(str.to_i).to_s)  
  end
end

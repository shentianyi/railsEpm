#encoding: utf-8
module EntryDateTimeHelper

  #get time string
  def self.get_utc_time_from_str str
    Time.parse(str).utc
  end

  #get hour date from time
  #e.g.
  #2014-4-14 23:23:43 => 2014-4-14 23:00:00 0800
  def self.get_hour_str time
    time.strftime('%Y-%m-%d %H:00:00 %z')
  end

  #get day date from time
  #e.g.
  #2014-4-14 23:23:43 => 2014-4-14 00:00:00 +0800
  def self.get_day_str time
    Time.at(time.to_i).strftime('%Y-%m-%d %z')
    #time.strftime('%Y-%m-%d 00:00:00 %z')
  end

  #get the first day of this week,we consider Monday as the first day
  #e.g.
  #2014-4-14 23:23:43 => 2014-4-14 00:00:00 +0800
  def self.get_week_day_str time
    Time.at(time.to_i).beginning_of_week.strftime('%Y-%m-%d 00:00:00 %z')
  end

  #get first day of this month
  #e.g.
  #2014-4-14 23:23:43 => 2014-4-1 00:00:00 +0800
  def self.get_month_day_str time
    Time.at(time.to_i).strftime('%Y-%m-01 00:00:00 %z')
  end

  #get first day for this quarter
  #e.g.
  #2014-4-14 23:23:43 => 2014-4-1 00:00:00 +0800
  def self.get_quarter_day_str time
    Time.at(time.to_i).beginning_of_quarter.strftime('%Y-%m-01 00:00:00 %z')
  end

  #get first day for this year
  #e.g.
  #2014-4-14 23:23:43 => 2014-1-1 00:00:00 +0800
  def self.get_year_day_str time
    Time.at(time.to_i).strftime('%Y-01-01 00:00:00 %z')
  end
end
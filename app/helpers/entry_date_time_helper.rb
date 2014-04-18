#encoding: utf-8
module EntryDateTimeHelper

  #get time string
  def self.get_utc_time_from_str str
    Time.parse(str).utc
  end

  #=============
  #Functions used to transfer time to store in db
  #=============
  #get hour date from time
  #e.g.
  #2014-4-14 23:23:43 => 2014-4-14 23:00:00 0800
  def self.db_hour_date time
    time.strftime('%Y-%m-%d %H:00:00 %z')
  end

  #get day date from time
  #e.g.
  #2014-4-14 23:23:43 => 2014-4-14 00:00:00 +0800
  def self.db_day_date time
    Time.at(time.to_i).strftime('%Y-%m-%d %z')
    #time.strftime('%Y-%m-%d 00:00:00 %z')
  end

  #get the first day of this week,we consider Monday as the first day
  #e.g.
  #2014-4-14 23:23:43 => 2014-4-14 00:00:00 +0800
  def self.db_week_day_date time
    Time.at(time.to_i).beginning_of_week.strftime('%Y-%m-%d 00:00:00 %z')
  end

  #get first day of this month
  #e.g.
  #2014-4-14 23:23:43 => 2014-4-1 00:00:00 +0800
  def self.db_month_day_date time
    Time.at(time.to_i).strftime('%Y-%m-01 00:00:00 %z')
  end

  #get first day for this quarter
  #e.g.
  #2014-4-14 23:23:43 => 2014-4-1 00:00:00 +0800
  def self.db_quarter_day_date time
    Time.at(time.to_i).beginning_of_quarter.strftime('%Y-%m-01 00:00:00 %z')
  end

  #get first day for this year
  #e.g.
  #2014-4-14 23:23:43 => 2014-1-1 00:00:00 +0800
  def self.db_year_day_date time
    Time.at(time.to_i).strftime('%Y-01-01 00:00:00 %z')
  end

  #=============
  #Functions used to show a specific date string
  #=============
  #get hour string
  #e.g. 2014-4-14 16:00:00 +0800
  def self.view_hour_str time
    time.strftime('%Y-%m-%d %H:00:00 %z')
  end

  #get day string
  #e.g. 2014-4-14 +0800
  def self.view_day_str time
    time.strftime('%Y-%m-%d %Z')
  end

  #get week string
  #e.g. 2014-05
  def self.view_week_str time
    time.strftime('%Y-%W')
  end

  #get month string
  #e.g. 2014-12
  def self.view_month_str time
    time.strftime('%Y-%m')
  end

  #get quarter string
  #e.g. 2014-03
  def self.view_quarter_str time
    time.strftime('%Y-'+(time.month/3+1))
  end

  #get year string
  #e.gg 2014
  def self.view_year_str time
    time.strftime('%Y')
  end
end
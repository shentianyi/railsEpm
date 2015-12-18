class Time
  FULL_COMMON_YEAR_DAYS_IN_MONTH = [nil, nil, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31]
  COMMON_DAYS_IN_QUARTER= [90, 91, 92, 92]
  COMMON_END_SPEED=1.second

  def full_next_begin_of_hour
    self+1.hour
  end

  def full_end_of_hour
    full_next_begin_of_hour-COMMON_END_SPEED
  end

  def full_next_begin_of_day
    self+1.day
  end

  def full_end_of_day
    full_next_begin_of_day-COMMON_END_SPEED
  end

  def full_next_begin_of_week
    self+7.days
  end

  def full_end_of_week
    full_next_begin_of_week-COMMON_END_SPEED
  end


  def full_next_begin_of_month
    if self.month==1
      self+(self.year.leap? ? 29.days : 28.days)
    else
      self+FULL_COMMON_YEAR_DAYS_IN_MONTH[self.month].days
    end
  end

  def full_end_of_month
    full_next_begin_of_month-COMMON_END_SPEED
  end

  def full_next_begin_of_quarter
    if self.month==12
      self+((self.year+1).leap? ? (COMMON_DAYS_IN_QUARTER[0]+1).days : COMMON_DAYS_IN_QUARTER[0].days)
    else
      self + COMMON_DAYS_IN_QUARTER[(self.month-1)/3+1].days
    end
  end

  def full_end_of_quarter
    full_next_begin_of_quarter-COMMON_END_SPEED
  end

  def full_next_begin_of_year
    self+((self.year+1).leap? ? 366.days : 365.days)
  end

  def full_end_of_year
    full_next_begin_of_year-COMMON_END_SPEED
  end

end

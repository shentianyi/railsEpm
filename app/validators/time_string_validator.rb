class TimeStringValidator< ActiveModel::Validator
  def validate(record)
    if !DashboardItem::time_string_to_time_span(record.time_string)
      record.errors[:time_string] << 'Invalid time string'
    end
  end
end
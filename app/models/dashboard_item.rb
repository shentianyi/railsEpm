 #this class is defined in /validators/TimeStringValidator.rb. Need to add path to the environment
class TimeStringValidator< ActiveModel::Validator
  def validate(record)
    if !DashboardItemsController::time_string_to_time_span(record.time_string)
      record.errors[:time_string] << 'Invalid time string'
    end
  end
end


class DashboardItem < ActiveRecord::Base
  belongs_to :dashboard
  attr_accessible :dashboard_id,:entity_group,:kpi_id,:calculate_type,:time_string,:sequence
  validates_with TimeStringValidator
 validates :dashboard_id,:presence => true
  validates :entity_group,:presence => true
  validates :kpi_id,:presence => true
  validates :calculate_type,:presence => true





end


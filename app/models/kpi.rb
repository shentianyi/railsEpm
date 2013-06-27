#encoding: utf-8
class Kpi < ActiveRecord::Base
  belongs_to :kpi_category
  attr_accessible :description, :desired_direction, :entry_frequency, :is_calculated, :kpi_period, :name, :target, :unit
end

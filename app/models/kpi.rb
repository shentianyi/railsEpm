#encoding: utf-8
class Kpi < ActiveRecord::Base
  belongs_to :kpi_category
  has_many :kpi_items
  has_many :user_kpis
  attr_accessible :description, :desired_direction, :entry_frequency, :is_calculated, :kpi_period, :name, :target, :unit,:formula
end

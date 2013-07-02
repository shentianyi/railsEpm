#encoding: utf-8
class Kpi < ActiveRecord::Base
  belongs_to :kpi_category
  has_many :kpi_items,:dependent=>:destroy
  has_many :kpi_parents,:class_name=>'KpiItem',:foreign_key=>'item_id'
  has_many :user_kpis,:dependent=>:destroy
  attr_accessible :description, :direction, :frequency, :is_calculated, :period, :name, :target, :unit,:formula
  attr_accessible :kpi_category_id
end

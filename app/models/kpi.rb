#encoding: utf-8
class Kpi < ActiveRecord::Base
  belongs_to :kpi_category
  has_many :kpi_items,:dependent=>:destroy
  has_many :kpi_parents,:class_name=>'KpiItem',:foreign_key=>'item_id'
  has_many :user_kpi_items,:dependent=>:destroy
 belongs_to :creator,:class_name=>'User',:foreign_key=>'user_id'
  attr_accessible :description, :direction, :frequency, :is_calculated, :period, :name, :target, :unit,:formula
  attr_accessible :kpi_category_id
end

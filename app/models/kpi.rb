#encoding: utf-8
class Kpi < ActiveRecord::Base
  belongs_to :kpi_category
  has_many :kpi_items,:dependent=>:destroy
  #has_many :kpi_parents,:class_name=>'Kpi',:through=>:kpi_items,:foreign_key=>'item_id'
  has_many :user_kpi_items,:dependent=>:destroy
  has_many :base_kpis,:through=>:kpi_items,:source=>'base_kpi'

  belongs_to :creator,:class_name=>'User',:foreign_key=>'user_id'

  has_many :kpi_entries,:through=>:user_kpi_items
  belongs_to :tenant
  attr_accessible :description, :direction, :frequency, :is_calculated, :period, :name, :target, :unit,:formula
  attr_accessible :kpi_category_id,:tenant_id

  acts_as_tenant(:tenant)
end

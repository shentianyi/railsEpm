class Admin::KpiTemplate < ActiveRecord::Base
  belongs_to :admin_kpi_category_template
  attr_accessible :description, :direction, :formula, :formula_string, :frequency, :is_calculated, :name, :period, :target, :unit
end

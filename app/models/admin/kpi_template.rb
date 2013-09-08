#encoding:utf-8
class Admin::KpiTemplate < ActiveRecord::Base
  belongs_to :admin_kpi_category_template,:class_name=>'Admin::KpiCategoryTemplate'
  attr_accessible :description, :direction, :formula, :formula_string, :frequency, :is_calculated, :name, :period, :target, :unit
  attr_accessible :admin_kpi_category_template_id
  def self.csv_headers
    ['Name','Description','IsCalculated','Formula','Frequency','Direction','Target','Unit','KpiCategory']
  end
  validate :validate_create ,:on=>:create

  def validate_create
    if  !self.formula.blank?
      errors.add(:formula,"公式不合法")  if ! FormulaValidator::complete_validate_infix(self.formula)
    end
  end

end

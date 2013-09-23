#encoding: utf-8
class Kpi < ActiveRecord::Base
  belongs_to :kpi_category
  has_many :kpi_items,:dependent=>:destroy
  has_many :kpi_parent_items,:class_name=>'KpiItem',:foreign_key=>'item_id'
  has_many :user_kpi_items,:dependent=>:destroy
  has_many :base_kpis,:through=>:kpi_items,:source=>'base_kpi'

  belongs_to :creator,:class_name=>'User',:foreign_key=>'user_id'

  has_many :kpi_entries,:through=>:user_kpi_items
  belongs_to :tenant
  attr_accessible :description, :direction, :frequency, :is_calculated, :period, :name, :target, :unit,:formula,:formula_string
  attr_accessible :kpi_category_id,:tenant_id

  acts_as_tenant(:tenant)

  validate :validate_create_update
  def validate_create_update
    if  !self.formula.blank?
      errors.add(:formula,"公式不合法")  if ! FormulaValidator::complete_validate_infix(self.formula)
    end
    errors.add(:name,'同一类别KPI不可重复') if self.class.where(:name=>self.name,:kpi_category_id=>self.kpi_category_id).first if new_record? # for create
    errors.add(:name,'同一类别KPI不可重复') if self.class.where(:name=>self.name,:kpi_category_id=>self.kpi_category_id).where('id<>?',self.id).first unless new_record? # for update
  end

  def self.parent_kpis_by_id id
    kpis= Kpi.joins(:kpi_items).where('kpi_items.item_id=?',id).all
    kpis.count>0 ? kpis : nil
  end

  def self.base_kpis current_ability
    self.accessible_by(current_ability).where(:is_calculated=>false).all
  end

  def self.ability_find_by_id id,current_ability
    self.accessible_by(current_ability).find_by_id(id)
  end
end

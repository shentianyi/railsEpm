#encoding: utf-8
class KpiCategory < ActiveRecord::Base
  belongs_to :tenant
  has_many :kpis,:dependent=>:destroy

  attr_accessible :kpi_quantity, :name,:description,:tenant_id

  acts_as_tenant(:tenant)

  validate :validate_create_update
  
  def self.ability_all current_ability
    self.accessible_by(current_ability).all
  end
  private
  def validate_create_update
    errors.add(:name,'类别不可重复') if KpiCategory.where(:name=>self.name,:tenant_id=>self.tenant_id).first if new_record?
    errors.add(:name,'类别不可重复') if KpiCategory.where(:name=>self.name,:tenant_id=>self.tenant_id).where('id<>?',self.id).first unless new_record?
  end
end

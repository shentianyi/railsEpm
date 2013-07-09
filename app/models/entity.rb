#encoding: utf-8
class Entity < ActiveRecord::Base
  belongs_to :tenant
  has_many :entity_groups, :through=>:entity_group_items,:dependent=>:destroy
  has_many :users

  has_many :user_kpi_items,:dependent=>:destroy
  has_many :kpi_entries, :through=>:user_kpi_items

  attr_accessible :name, :status, :user_quantity

  acts_as_tenant(:tenant)

  validate :validate_save,:on=>:save
  private
  def validate_save
    errors.add(:name,'组织名不可重复') if Entity.where(:name=>self.name,:entity_id=>self.entity_id)
  end
end

#encoding: utf-8
class Entity < ActiveRecord::Base
  belongs_to :tenant
  belongs_to :department
  has_many :entity_group_items, :dependent => :destroy
  has_many :users


  has_many :user_kpi_items, :dependent => :destroy
  #has_many :kpi_entries, :through => :user_kpi_items
  # has_many :entity_contacts
  has_many :entity_contacts, :as => :contactable, :dependent => :destroy
  has_many :contacts, :through => :entity_contacts
  attr_accessible :name, :status, :user_quantity, :description, :code, :department_id,:is_last

  acts_as_tenant(:tenant)

  # validate :validate_create_update

  def self.ability_find_by_id id, current_ability
    Entity.accessible_by(current_ability).find_by_id(id)
  end

  def self.with_user_quantity
    joins('left join users on entities.id=users.entity_id').select('entities.*,count(users.id) as user_quantity').group('entities.id')
  end

  # private
  #
  # def validate_create_update
  #   errors.add(:code, I18n.t("fix.cannot_repeat")) if Entity.where(:code => self.code, :tenant_id => self.tenant_id).first if new_record?
  #   errors.add(:code, I18n.t("fix.cannot_repeat")) if Entity.where(:code => self.code, :tenant_id => self.tenant_id).where('id<>?', self.id).first unless new_record?
  # end
end

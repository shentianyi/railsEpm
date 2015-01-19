#encoding: utf-8
class EntityContact < ActiveRecord::Base
  belongs_to :contact
  belongs_to :user
  belongs_to :contactable, :polymorphic => true
  belongs_to :tenant
  attr_accessible :contactable_id, :contact_id,:user_id, :contactable_type
  #
  acts_as_tenant(:tenant)

  validate :validate_save

  def self.contact_detail
    joins(:user).joins(:tenant).select("#{User.contact_attrs},tenants.company_name,entity_contacts.*")
  end

  private
  def validate_save
    errors.add(:contactable_id, I18n.t("fix.cannot_repeat")) if EntityContact.where(contactable_id: self.contactable_id, user_id: self.user_id, contactable_type: self.contactable_type).first if new_record?
  end
end

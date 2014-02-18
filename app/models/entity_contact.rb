#encoding: utf-8
class EntityContact < ActiveRecord::Base
  belongs_to :contact
  belongs_to :contactable, :polymorphic=>true
  belongs_to :tenant
  attr_accessible :contactable_id, :contact_id,:contactable_type
  #
  acts_as_tenant(:tenant)

  validate :validate_save

  private
  def validate_save
   errors.add(:contactable_id,I18n.t("fix.cannot_repeat")) if EntityContact.where(contactable_id:self.contactable_id,contact_id:self.contact_id,contactable_type:self.contactable_type).first if new_record?
  end
end

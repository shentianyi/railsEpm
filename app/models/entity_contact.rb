#encoding: utf-8
class EntityContact < ActiveRecord::Base
  belongs_to :entity
  belongs_to :contact
  belongs_to :tenant
  attr_accessible :entity_id, :contact_id
  #
  acts_as_tenant(:tenant)

  validate :validate_save

  private
  def validate_save
   errors.add(:entity_id,I18n.t("fix.cannot_repeat")) if EntityContact.where(entity_id:self.entity_id,contact_id:self.contact_id).first if new_record?
  end
end

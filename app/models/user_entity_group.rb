class UserEntityGroup < ActiveRecord::Base
  belongs_to :user
  belongs_to :entity_group
  attr_accessible :user_id, :entity_group_id

  validate :validate_save

  private

  def validate_save
    errors.add(:user_id, I18n.t('manage.view.validate.already_shared')) if self.class.where(user_id: self.user_id, entity_group_id: self.entity_group_id).first if new_record?
  end
end

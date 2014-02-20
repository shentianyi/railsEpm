class EntityGroupItem < ActiveRecord::Base
  belongs_to :entity
  belongs_to :entity_group
  attr_accessible :entity_id, :entity_group_id
  
   validate :validate_create_update
  def validate_create_update 
    errors.add('',I18n.t('manage.view.already_assigned')) if self.class.where(:entity_id=>self.entity_id,:entity_group_id=>self.entity_group_id).first if new_record? # for create
  end
end

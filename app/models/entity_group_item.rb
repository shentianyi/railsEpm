class EntityGroupItem < ActiveRecord::Base
  belongs_to :entity
  belongs_to :entity_group
  attr_accessible :entity_id, :entity_group_id
end

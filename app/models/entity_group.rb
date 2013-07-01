class EntityGroup < ActiveRecord::Base
  belongs_to :user
  has_many :entity_group_items
  attr_accessible :name
end

class EntityGroupItem < ActiveRecord::Base
  belongs_to :entity
  belongs_to :entity_group
  # attr_accessible :title, :body
end

class UserEntity < ActiveRecord::Base
  belongs_to :user
  belongs_to :entity
  attr_accessible :user_id, :entity_id
end

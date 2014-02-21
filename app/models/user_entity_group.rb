class UserEntityGroup < ActiveRecord::Base
  belongs_to :user
  belongs_to :entity_group
  # attr_accessible :title, :body
end

class StorySetUser < ActiveRecord::Base
  attr_accessible :user_id, :story_set_id
  belongs_to :user
  belongs_to :story_set
end

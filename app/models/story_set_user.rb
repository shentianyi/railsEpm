class StorySetUser < ActiveRecord::Base
  include AutoAlert

  attr_accessible :user_id, :story_set_id
  belongs_to :user
  belongs_to :story_set
  belongs_to :collaborated_story_set,:class_name => 'StorySet',:foreign_key => 'story_set_id'
end

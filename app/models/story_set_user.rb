class StorySetUser < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :user
  belongs_to :story_set
  belongs_to :collaborated_story_set,:class_name => 'StorySet',:foreign_key => 'story_set_id'
end

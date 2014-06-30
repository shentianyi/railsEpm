class StorySet < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :user
  has_many :story_set_users, :dependent => :destroy
  has_many :collaborators,  :through => :stroy_set_users, class_name => "User"
  has_many :stories, :destroy => :destroy
end

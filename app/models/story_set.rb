class StorySet < ActiveRecord::Base

  attr_accessible :title, :description, :email_alert, :sms_alert

  belongs_to :user
  has_many :story_set_users, :dependent => :destroy
  has_many :collaborators, :through => :story_set_users, :source => :user
  has_many :stories, :dependent => :destroy
  belongs_to :tenant
  acts_as_tenant(:tenant)

end

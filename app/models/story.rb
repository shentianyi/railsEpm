class Story < ActiveRecord::Base
  attr_accessible :title, :description, :story_set_id
  belongs_to :user
  belongs_to :story_set
  has_many :chart_conditions, :as => :chartable, :dependent => :destroy
  has_many :attachments, :as => :attachable, :dependent => :destroy
  has_many :comments, :as => :commentable, :dependent => :destroy
  belongs_to :tenant
  acts_as_tenant(:tenant)


  def self.detail_by_set_id id
    joins(:user).where(story_set_id: id).select('users.first_name as user_name, users.image_url as user_avatar,stories.*')
  end
end

class Comment < ActiveRecord::Base
  attr_accessible :content
  belongs_to :user
  belongs_to :commentable, :polymorphic => true
  has_many :attachments, :as => :attachable, :dependent => :destroy
  belongs_to :tenant

  acts_as_tenant(:tenant)

  def self.detail_by_commentable(commentable)
    commentable.comments.joins(:user).select('users.first_name as user_name, users.image_url as user_avatar,comments.*')
  end
end

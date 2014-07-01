class Comment < ActiveRecord::Base
  attr_accessible :content
  belongs_to :user
  belongs_to :commentable, :polymorphic => true
  has_many :attachments, :as => :attachable, :dependent => :destroy
  belongs_to :tenant

  acts_as_tenant(:tenant)
  after_create :incr_comment_count

  def self.detail_by_commentable(commentable)
    commentable.comments.joins(:user).select('users.first_name as user_name, users.image_url as user_avatar,comments.*')
  end

  def incr_comment_count
    self.commentable.comment_count+=1
    self.commentable.save
  end
end

class Comment < ActiveRecord::Base
  attr_accessible :content
  belongs_to :user
  belongs_to :commentable, :polymorphic => true
  has_many :attachments, :as => :attachable, :dependent => :destroy
  belongs_to :tenant

  acts_as_tenant(:tenant)
  after_create :incr_comment_count_and_set_message

  def self.detail_by_commentable(commentable)
    commentable.comments.joins(:user).select('users.first_name as user_name, users.image_url as user_avatar,comments.*')
  end

  def incr_comment_count_and_set_message
    self.commentable.comment_count+=1
    self.commentable.save
    if self.commentable.class.name=='Story'
      UserMessage.add_story_comment_message(self.commentable.user_id) unless self.commentable.user_id==self.user_id
    end
  end
end

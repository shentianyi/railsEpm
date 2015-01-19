class Comment < ActiveRecord::Base
  attr_accessible :content
  belongs_to :user
  belongs_to :commentable, :polymorphic => true
  has_many :attachments, :as => :attachable, :dependent => :destroy
  belongs_to :tenant

  acts_as_tenant(:tenant)
  after_create :incr_comment_count_and_pub_message

  def self.detail_by_commentable(commentable)
    commentable.comments.joins(:user).order('id desc').select('users.first_name as user_name, users.image_url as user_avatar,comments.*')
  end

  def incr_comment_count_and_pub_message
    self.commentable.comment_count+=1
    self.commentable.save
    if self.commentable.class.name=='Story'
      unless self.commentable.user_id==self.user_id
        UserMessage.add_story_comment_message(self.commentable.user_id)
        EventMessage.new(sender_id: self.user_id, receiver_ids: [self.commentable.user_id], content: "##{self.commentable.title}##{self.content}",
                         messageble_type: self.class.name, messageable_id: self.id,
                         type: EventMessageType::UNREAD_STORY_COMMENT).save
      end
    end
  end
end

class StorySet < ActiveRecord::Base

  attr_accessible :title, :description, :email_alert, :sms_alert, :comment_count, :chart_count, :user_count

  belongs_to :user
  has_many :story_set_users, :dependent => :destroy
  has_many :collaborators, :through => :story_set_users, :source => :user
  has_many :stories, :dependent => :destroy
  belongs_to :tenant
  acts_as_tenant(:tenant)

  after_create :generate_collaborator_set
  after_create :pub_collaborator_message

  def self.regenerate_collaborator_set
    all.each do |ss|
      key=ss.generate_key
      $redis.del key
      ss.generate_collaborator_set
    end
  end

  #private
  def generate_collaborator_set
    c= self.collaborators.all
    $redis.sadd(generate_key, c.collect { |u| u.id }) if c.count>0
  end

  def pub_collaborator_message
    user_ids= collaborator_set.select { |u| u.to_i!=self.user_id }
    UserMessage.add_story_set_message(user_ids)

    EventMessage.new(sender_id: self.user_id, receiver_ids:user_ids, content: self.title,
                     messageble_type: self.class.name, messageable_id: self.id,
                     type: EventMessageType::ADD_TO_STROY_SET).save
  end

  def collaborator_set
    $redis.smembers(generate_key)
  end

  def generate_key
    "story_set:#{self.id}:collaborator:set"
  end
end

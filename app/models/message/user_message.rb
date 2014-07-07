#encoding: utf-8
require 'base_class'

class UserMessage<CZ::BaseClass
  attr_accessor :key, :type, :count, :content, :user_id, :link

  def initialize(params={})
    super
    @key = UserMessage.generate_key(@user_id, @type) if @key.blank?
    @count=1 if @count.blank?
  end

  def save
    if message=UserMessage.find(self.user_id, self.type)
      $redis.hset message.key, 'count', message.count.to_i+1
    else
      $redis.hmset self.key, 'user_id', self.user_id, 'count', self.count, 'type', self.type
    end
  end

  def self.find(user_id, type)
    key= generate_key(user_id, type)
    if $redis.exists key
      return UserMessage.new($redis.hgetall key)
    end
  end

  def self.generate_key(user_id, type)
    "user:#{user_id}:message_box:#{type}"
  end


  def self.add_story_set_message user_ids
    user_ids.each do |user_id|
      UserMessage.new(user_id: user_id, type: UserMessageType::ADD_TO_STROY_SET).save
    end
  end

  def self.add_new_story_messgage user_ids
    user_ids.each do |user_id|
      UserMessage.new(user_id: user_id, type: UserMessageType::NEW_STORY).save
    end
  end

  def self.add_story_comment_message user_id
    UserMessage.new(user_id: user_id, type: UserMessageType::UNREAD_STORY_COMMENT).save
  end

  def self.clean_subscription_message user_id
    if message=find(user_id, UserMessageType::SUBSCRIBE_ALERT)
      $redis.hset message.key, 'count', 0
    end
  end

  def self.add_subscription_message user_id
    UserMessage.new(user_id: user_id, type: UserMessageType::SUBSCRIBE_ALERT).save
  end


  def self.clean_story_set_message user_id
    if message=find(user_id, UserMessageType::ADD_TO_STROY_SET)
      $redis.hset message.key, 'count', 0
    end
  end

  def self.clean_new_story_message user_id
    if message=find(user_id, UserMessageType::NEW_STORY)
      $redis.hset message.key, 'count', 0
    end
  end

  def self.clean_story_comment_message user_id
    if message=find(user_id, UserMessageType::UNREAD_STORY_COMMENT)
      $redis.hset message.key, 'count', 0
    end
  end

  def self.all(user_id)
    messages=[]
    UserMessageType.types.each do |type|
      if message=self.find(user_id, type)
        cl= UserMessageType.content_and_link(type)
        messages<<{count: message.count.to_i, content: cl[0], link: cl[1],type:type}
      end
    end
    return messages
  end
end
#encoding: utf-8
require 'base_class'

class UserMessage<CZ::BaseClass
  attr_accessor :key, :message_box_key, :type, :content, :count, :queue, :link, :messageable_type, :messageable_id

  attr_accessor :key_params

  def initialize(params={})
    super
    self.key= SecureRandom.uuid
    init_attr
  end

  def save
    $redis.hmset self.key, 'message_box_key', self.message_box_key, 'type', self.type,
                 'link', self.link, 'messageable_type', self.messageable_type, 'messageable_id', self.messageable_id
    UserMessageBox.add_message(self)
  end


  def destroy
    $redis.del self.key
  end

  def init_attr
    case self.messageable_type
      when 'StorySet'
        self.type=UserMessageType::ADD_TO_STROY_SET
        self.link='/story_sets'
        self.message_box_key="user:#{self.key_params[:user_id]}:message_box:#{self.type}"
      else
        raise ArgumentError
    end
  end
end
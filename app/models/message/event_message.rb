require 'base_class'

class EventMessage<CZ::BaseClass
  attr_accessor :key, :box_type, :created_at, :created_at_dispaly, :link, :content, :content_display, :type, :sender_id, :receiver_ids,
                :messageable_type, :messageable_id

  def initialize(params={})
    super
    if @key.blank?
      @key="event_message:#{SecureRandom.uuid}"
      @created_at=Time.now.to_milli
      @box_type=EventMessageType.get_message_box_type(@type)
    else
      self.init_content_and_link
    end
  end

  def save
    $redis.hmset(self.key, 'key', self.key, 'box_type', self.box_type, 'created_at', self.created_at, 'type', self.type,
                 'sender_id', self.sender_id, 'messageble_type', self.messageable_type, 'messageable_id', self.messageable_id, 'content', self.content)
    send_it
  end

  def send_it
    EventMessageBox.add_message(self, self.receiver_ids)
  end

  def init_content_and_link
    cl=EventMessageType.content_and_link(self)
    @content_display= "#{User.find_by_id(self.sender_id).first_name}, #{cl[0]}: #{self.content}"
    @link=cl[1]
    @created_at_dispaly=Time.at(self.created_at.to_i/1000)
  end
end
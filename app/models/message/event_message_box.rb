require 'base_class'

class EventMessageBox<CZ::BaseClass
  LIMIT=50

  def self.add_message(msg, receiver_ids)
    receiver_ids.each do |receiver_id|
      list_key= genereate_event_message_list_key(receiver_id, msg.box_type)
      $redis.zremrangebyrank list_key, 0, -LIMIT
      $redis.zadd list_key, msg.created_at, msg.key
    end
  end

  def self.all_story_set_message(user_id)
   all_message_by_type(user_id, EventMessageBoxType::STORY_SET_EVENT)
  end

  def self.all_message_by_type user_id, type
    list_key= genereate_event_message_list_key(user_id, type)
    keys=$redis.zrevrange(list_key, 0, -1)
    EventMessage.find_by_ids(keys)
  end

  def self.genereate_event_message_list_key(user_id, type)
    "user:#{user_id}:event_message_box:#{type}:list:key"
  end
end
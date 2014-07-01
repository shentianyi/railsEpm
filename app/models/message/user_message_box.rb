require 'base_class'

class UserMessageBox<CZ::BaseClass
  attr_accessor :key, :type, :count
  attr_accessor :messages


  def self.add_message(message, push=false)
    unless box=self.find_by_id(message.message_box_key)
      box= UserMessageBox.new(key: message.message_box_key, count: 0, type: message.type)
    end
    box.count=box.count.to_i+1
    if push
      list_key=box.genereate_message_list_key
      $redis.rpush list_key, message.key
    end
  end

  def self.remove_message(message)
    if box=self.find_by_id(message.message_box_key)
      box.count=box.count.to_i-1 if box.count.to_i>0
      list_key=box.genereate_message_list_key
      $redis.lpop list_key, message.key
      box.save
    end
  end

  def self.clean_message(key)
    if box=self.find_by_id(message.message_box_key)
      box.count=0
      list_key=box.genereate_message_list_key
      $redis.del list_key
      box.save
    end
  end

  def save
    $redis.hmset self.key, 'type', self.type, 'count', self.count
  end

  def genereate_message_list_key
    "user_message_box:#{self.key}:message:list"
  end
end
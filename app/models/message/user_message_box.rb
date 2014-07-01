require 'base_class'

class UserMessageBox<CZ::BaseClass
  #attr_accessor :key, :type, :count, :content, :user_id, :link
  #
  #def initialize(params={})
  #  super
  #  @key = UserMessageBox.generate_key(@user_id, @type)
  #end
  #
  #def save
  #  $redis.hmset self.key, 'user_id', self.user_id, 'count', self.count
  #end
  #
  #def self.generate_key(user_id, type)
  #  "user:#{user_id}:message_box:#{type}"
  #end
  #
  #def genereate_message_list_key
  #  "#{self.key}:message_list:key"
  #end
end
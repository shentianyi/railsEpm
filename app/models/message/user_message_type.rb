class UserMessageType
  ADD_TO_STROY_SET=100
  NEW_STORY=200
  UNREAD_STORY_COMMENT=300
  SUBSCRIBE_ALERT=400

  def self.types
    self.constants.collect { |c|
      self.const_get(c)
    }
  end

  def self.genereate_user_message_key(user_id, type, key_params=nil)
    return case type
             when ADD_TO_STROY_SET
               "user:#{user_id}:message_box:#{type}"
             when UNREAD_STORY_COMMENT
               "user:#{user_id}:message_box:#{type}:story:#{key_params[:story_id]}"
           end
  end

  def self.content_and_link(type)
    case type
      when ADD_TO_STROY_SET
        return I18n.t('user_message.add_to_story_set')
      when UNREAD_STORY_COMMENT
        return I18n.t('user_message.story_comment')
      else
        ''
    end
  end


end
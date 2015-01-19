class EventMessageType
  ADD_TO_STROY_SET=100
  NEW_STORY=200
  UNREAD_STORY_COMMENT=300

  def self.get_message_box_type type
    return case type
             when ADD_TO_STROY_SET..UNREAD_STORY_COMMENT
               EventMessageBoxType::STORY_SET_EVENT
             else
               nil
           end
  end

  def self.content_and_link msg
    case msg.type.to_i
      when ADD_TO_STROY_SET
        return I18n.t('event_message.add_to_story_set'), '/story_sets/'+msg.messageable_id+'/story'
      when UNREAD_STORY_COMMENT
        return I18n.t('event_message.story_comment'), '/story_sets/'+msg.messageable_id+'/story?comment'
      when NEW_STORY
        return I18n.t('event_message.new_story'), '/story_sets/'+msg.messageable_id+'/story?story'
      else
        ''
    end
  end
end
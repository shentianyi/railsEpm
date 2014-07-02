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


  def self.content_and_link(type)
    case type
      when ADD_TO_STROY_SET
        return I18n.t('user_message.add_to_story_set'), '/story_sets'
      when UNREAD_STORY_COMMENT
        return I18n.t('user_message.story_comment'), '/story_sets'
      when NEW_STORY
        return I18n.t('user_message.new_story'), '/story_sets'
      when SUBSCRIBE_ALERT
        return 'You have kpi subscription alert ', '/kpi_subscribes/mine'
      else
        ''
    end
  end


end
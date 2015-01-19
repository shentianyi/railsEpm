StorySet.all.each do |ss|
  ss.destroy
end

User.all.each do |u|
  EventMessageBox.all_story_set_message(u.id).each do |msg|
    msg.destroy if msg
  end
  EventMessageBoxType.types.each do |type|
    key=EventMessageBox.genereate_event_message_list_key(u.id, type)
    $redis.del key
  end

  UserMessageType.types.each do |type|
    key= UserMessage.generate_key(u.id, type)
    $redis.del key
  end
end
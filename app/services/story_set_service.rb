class StorySetService
  def self.generate_story_set_user user_ids
    if user_ids.nil?
      []
    end
    story_sets_users = []
    user_ids.each do |id|
      if User.find_by_id(id)
        story_sets_users << StorySetUser.new(:user_id => id)
      end
    end
    story_sets_users
  end
end
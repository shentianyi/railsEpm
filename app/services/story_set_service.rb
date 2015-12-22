class StorySetService
  def self.gen_collaborators user_ids
    if user_ids.nil?
      []
    end
    collaborators = []
    user_ids.each do |id|
      if u = User.find_by_id(id)
        collaborators << u
      end
    end
    collaborators
  end

  def self.details user, params
    if discussion = user.tenant.story_sets.find_by_id(params[:discussion_id])
      StorySetPresenter.new(discussion).as_basic_story_set
    else
      ApiMessage.new(messages: ['The Discussion Not Found'])
    end
  end

end
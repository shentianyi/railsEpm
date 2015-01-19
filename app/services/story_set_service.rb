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
end
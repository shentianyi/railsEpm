#encoding: utf-8
class StorySetUserPresenter<Presenter
  Delegators=[:id, :story_set_id, :user_id]
  def_delegators :@story_set_user, *Delegators

  def initialize(story_set_user)
    @story_set_user=story_set_user
    self.delegators =Delegators
  end

  def self.as_story_set_users items
    infos=[]

    items.each do |item|
      infos<<User.nick_name(item.user_id)
    end

    infos
  end

end

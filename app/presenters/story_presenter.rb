#encoding: utf-8
class StoryPresenter<Presenter
  Delegators=[:id, :description,:comment_count, :created_at, :updated_at, :title, :user_id, :user_name, :user_avatar,:user_title,:email]
  def_delegators :@story, *Delegators

  def initialize(story)
    @story=story
    self.delegators =Delegators
  end
end

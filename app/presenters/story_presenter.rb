#encoding: utf-8
class StoryPresenter<Presenter
  Delegators=[:id, :description, :comment_count, :created_at, :updated_at, :title, :user_id, :user_name, :image_url, :user_title, :email]
  def_delegators :@story, *Delegators
  attr_accessor :user_avatar

  def initialize(story)
    @story=story
    self.delegators =Delegators
    self.user_avatar=User.get_avatar(self.image_url)
  end
end

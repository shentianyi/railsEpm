#encoding: utf-8
class CommentPresenter<Presenter
  Delegators=[:id, :content, :created_at, :updated_at, :user_id, :user_name, :user_avatar, :attachments]
  def_delegators :@comment, *Delegators

  def initialize(comment)
    @comment=comment
    self.delegators =Delegators
  end
end

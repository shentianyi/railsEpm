#encoding: utf-8
class CommentPresenter<Presenter
  Delegators=[:id, :content, :created_at, :updated_at, :user_id, :user_name, :commentable_id, :commentable_type]
  def_delegators :@comment, *Delegators

  def initialize(comment)
    @comment=comment
    self.delegators =Delegators
  end

  def as_basic_info base_url
    {
        id: @comment.id,
        content: @comment.content,
        creator: UserPresenter.new(User.find_by_id(@comment.user_id)).as_brief_info(false),
        created_at: @comment.created_at.utc.to_s,
        attachments: AttachmentPresenter.parse_attachments(@comment.attachments, base_url)
    }
  end

  def as_basic_feedback(base_url, messages=nil, result_code=nil)
    {
        result_code: result_code||1,
        messages: messages,
        need_instruction: false,
        customized_field: as_basic_info(base_url)
    }
  end

end

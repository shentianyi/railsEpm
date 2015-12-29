module V2
  class CommentAPI < Base
    guard_all!

    namespace :comments do
      params do
        requires :id, type: Integer, desc: "comment id"
      end
      get do
        if comment=current_user.tenant.comments.find_by_id(params[:id])
          CommentPresenter.new(comment).as_basic_info(request.host_with_port)
        else
          ApiMessage.new(messages: ['The Comment Not Found'])
        end
      end

    end
  end
end
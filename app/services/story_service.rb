class StoryService
  def self.add_chart_condition condition, story
    c = ChartCondition.new(condition)
    story.chart_conditions<< c
    return story.chart_conditions
  end

  def self.details user, params
    if discussion = user.tenant.stories.find_by_id(params[:id])
      StoryPresenter.new(discussion).as_brief_info
    else
      ApiMessage.new(messages: ['The Discussion Not Found'])
    end
  end

  def self.user_accessable_stories user, page, size
    StoryPresenter.as_list(user.tenant.stories.offset(page*size).limit(size))
  end

  def self.user_created_stories user, page, size
    StoryPresenter.as_list(user.tenant.stories.where(user_id: user.id).offset(page*size).limit(size))
  end

  def self.members user, params
    if discussion = user.tenant.stories.find_by_id(params[:id])
      StoryPresenter.new(discussion).as_stories_members(user)
    else
      ApiMessage.new(messages: ['The Discussion Not Found'])
    end
  end

  def self.as_select_members user, params
    if discussion = user.tenant.stories.find_by_id(params[:id])
      StoryPresenter.new(discussion).as_select_members user
    else
      ApiMessage.new(messages: ['The Discussion Not Found'])
    end
  end

  def self.add_member user, params
    unless story = user.tenant.stories.find_by_id(params[:id])
      return ApiMessage.new(messages: ['The Discussion Not Found'])
    end

    unless member = user.tenant.users.find_by_id(params[:user_id])
      return ApiMessage.new(messages: ['The Add Member Not Found'])
    end

    begin
      StorySet.transaction do
        su = StorySetUser.new(user_id: params[:user_id])
        story.story_set.story_set_users<<su
        StoryPresenter.new(story).as_basic_feedback(['Discussion Member Add Success'], 1)
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.remove_member user, params
    begin
      if (ss=user.tenant.stories.find_by_id(params[:id])) && (su=ss.story_set.story_set_users.find_by_user_id(params[:member_id]))
        su.destroy
        ApiMessage.new(result_code: 1, messages: ['The Discussion Member Delete Success'])
      else
        return ApiMessage.new(messages: ['The Discussion Or Member Not Found'])
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.comments user, id
    if discussion = user.tenant.stories.find_by_id(id)
      StoryPresenter.as_comments discussion
    else
      ApiMessage.new(messages: ['The Discussion Not Found'])
    end
  end

  def self.add_comment user, params
    unless discussion = user.tenant.stories.find_by_id(params[:id])
      ApiMessage.new(messages: ['The Discussion Not Found'])
    end

    begin
      unless params[:comment][:content].blank?
        comment=Comment.new(content: params[:comment][:content])
        comment.commentable=discussion
        comment.user=user
        Attachment.add(params[:comment][:attachments].values, @comment) unless params[:comment][:attachments].blank?

        if comment.save
          CommentPresenter.new(comment).as_basic_feedback(['Discussion Comment Add Success'], 1)
        else
          ApiMessage.new(messages: ['Discussion Comment Add Failed'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end


end
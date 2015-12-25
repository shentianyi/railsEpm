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

  def self.user_accessable_stories user, kpi_id, page, size
    if user.tenant.kpis.find_by_id(kpi_id)
      StoryPresenter.as_list(Story.user_access_discussions_by_kpi(user, kpi_id).order(created_at: :desc).offset(page*size).limit(size))
    else
      ApiMessage.new(messages: ['The Kpi Not Found'])
    end
  end

  def self.user_created_stories user, kpi_id, page, size
    if user.tenant.kpis.find_by_id(kpi_id)
      StoryPresenter.as_list(Story.user_created_discussions_by_kpi(user, kpi_id).order(created_at: :desc).offset(page*size).limit(size))
    else
      ApiMessage.new(messages: ['The Kpi Not Found'])
    end
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
      return ApiMessage.new(messages: ['The Discussion Not Found'])
    end

    begin
      Comment.transaction do
        unless params[:comment][:content].blank?
          comment=Comment.new(content: params[:comment][:content])
          comment.commentable=discussion
          comment.user=user
          comment.tenant=user.tenant
          Attachment.add_attachment(params[:comment][:attachments].values, params[:comment][:attachments].type, comment) unless params[:comment][:attachments].blank?

          if comment.save
            CommentPresenter.new(comment).as_basic_feedback(['Discussion Comment Add Success'], 1)
          else
            ApiMessage.new(messages: ['Discussion Comment Add Failed'])
          end
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.remove_comment user, id
    begin
      if comment = user.tenant.comments.find_by_id(id)
        comment.destroy
        ApiMessage.new(result_code: 1, messages: ['The Discussion Comment Delete Success'])
      else
        return ApiMessage.new(messages: ['The Discussion Comment Not Found'])
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

end
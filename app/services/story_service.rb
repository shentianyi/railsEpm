class StoryService
  def self.add_chart_condition condition, story
    c = ChartCondition.new(condition)
    story.chart_conditions<< c
    return story.chart_conditions
  end

  def self.details user, params
    if discussion = user.tenant.stories.find_by_id(params[:id])
      StoryPresenter.new(discussion).as_brief_info(true, user)
    else
      ApiMessage.new(messages: ['The Discussion Not Found'])
    end
  end

  def self.resolve user, id
    if discussion = user.tenant.stories.find_by_id(id)
      if discussion.update_attributes({status: StorySet::StorySetStatus::CLOSED})
        StoryPresenter.new(discussion).as_brief_info
      else
        ApiMessage.new(messages: ['The Discussion Update Failed'])
      end
    else
      ApiMessage.new(messages: ['The Discussion Not Found'])
    end
  end

  def self.user_accessable_stories user, kpi_id, page, size
    if user.tenant.kpis.find_by_id(kpi_id)
      StoryPresenter.as_list(Story.user_access_discussions_by_kpi(user, kpi_id).order(created_at: :desc).offset(page*size).limit(size), user)
    else
      ApiMessage.new(messages: ['The Kpi Not Found'])
    end
  end

  def self.user_created_stories user, kpi_id, page, size
    if user.tenant.kpis.find_by_id(kpi_id)
      StoryPresenter.as_list(Story.user_created_discussions_by_kpi(user, kpi_id).order(created_at: :desc).offset(page*size).limit(size), user)
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

    if story.story_set.story_set_users.find_by_user_id(params[:user_id])
      return StoryPresenter.new(story).as_add_members_feedback(user, ['Discussion Member Add Success'], 1)
    end

    begin
      StorySetUser.transaction do
        su = StorySetUser.new(user_id: params[:user_id])
        story.story_set.story_set_users<<su
        StoryPresenter.new(story).as_add_members_feedback(user, ['Discussion Member Add Success'], 1)
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.validable_members user, story, member_ids
    err_infos=[]
    valid_member_ids=[]

    member_ids.uniq.each do |member_id|
      if user.tenant.users.find_by_id(member_id)
        unless story.story_set.story_set_users.find_by_user_id(member_id)
          valid_member_ids<<member_id
        end
      else
        err_infos<<"The Member ID:#{member_id} Not Found"
      end
    end
puts err_infos
    if err_infos.size==0
      puts '1111111111111111111111'
      puts valid_member_ids
      if block_given?
        yield(valid_member_ids)
      else
        ApiMessage.new(messages: ['The Members Valid'])
      end
    else
      ApiMessage.new(messages: err_infos)
    end
  end

  #add_multiple
  def self.add_members user, params
    unless story = user.tenant.stories.find_by_id(params[:id])
      return ApiMessage.new(messages: ['The Discussion Not Found'])
    end

    begin
      StorySetUser.transaction do
        validable_members(user, story, params[:user_ids]) do |member_ids|
          member_ids.each do |id|
            su = StorySetUser.new(user_id: id)
            story.story_set.story_set_users<<su
          end

          StoryPresenter.new(story).as_add_members_feedback(user, ['Discussion Members Add Success'], 1)
        end
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

  def self.comments user, params, base_url
    if discussion = user.tenant.stories.find_by_id(params[:id])
      StoryPresenter.as_comments discussion.comments.offset(params[:page]*params[:size]).limit(params[:size]), base_url
    else
      ApiMessage.new(messages: ['The Discussion Not Found'])
    end
  end

  def self.add_comment user, params, base_url
    puts params
    puts params[:comment]
    puts params[:comment][:attachments]
    puts '1----------------------------------'
    unless discussion = user.tenant.stories.find_by_id(params[:id])
      return ApiMessage.new(messages: ['The Discussion Not Found'])
    end

    # begin
    Comment.transaction do
      unless params[:comment][:content].blank?
        comment=Comment.new(content: params[:comment][:content])
        comment.commentable=discussion
        comment.user=user
        comment.tenant=user.tenant
        Attachment.add_attachments(params[:comment][:attachment_ids], comment) unless params[:comment][:attachment_ids].blank?

        if comment.save
          CommentPresenter.new(comment).as_basic_feedback(base_url, ['Discussion Comment Add Success'], 1)
        else
          ApiMessage.new(messages: ['Discussion Comment Add Failed'])
        end
      end
    end
    # rescue => e
    #   ApiMessage.new(messages: [e.message])
    # end
  end

  def self.remove_comment user, id
    begin
      if comment = user.comments.find_by_id(id)
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
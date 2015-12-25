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

  def self.details user, params
    if discussion = user.tenant.story_sets.find_by_id(params[:id])
      StoryPresenter.new(discussion.stories.first).as_brief_info
    else
      ApiMessage.new(messages: ['The Discussion Not Found'])
    end
  end

  def self.create user, params
    kpi = user.tenant.kpis.find_by_id(params[:kpi_id])
    department = user.tenant.departments.find_by_id(params[:department_id])
    if !kpi || !department
      return ApiMessage.new(messages: ['Kpi Or Department Not Exist'])
    end

    begin
      StorySet.transaction do
        #Create story set
        story_set = StorySet.new({
                                     title: params[:title],
                                     kpi_id: params[:kpi_id],
                                     status: StorySet::StorySetStatus::OPEN,
                                     department_id: params[:department_id]
                                 })
        story_set.user = user
        story_set.tenant = user.tenant
        story_set.collaborators = [user]+StorySetService.gen_collaborators(params[:members])
        story_set.user_count = story_set.collaborators.count

        story = Story.new(content: params[:content], title: params[:title], status: StorySet::StorySetStatus::OPEN)
        story.user = user
        story.tenant = user.tenant
        story_set.stories<<story

        if story_set.save
          StoryPresenter.new(story).as_basic_feedback(['Discussion Create Success'], 1)
        else
          ApiMessage.new(messages: ['Discussion Create Failed'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  ########################################################################################################################
  # def self.user_accessable_story_set user, page, size
  #   StoryPresenter.as_list(user.tenant.story_sets.offset(page*size).limit(size))
  # end
  #
  # def self.user_created_story_set user, page, size
  #   StorySetPresenter.as_list(user.tenant.story_sets.where(user_id: user.id).offset(page*size).limit(size))
  # end
  #
  # def self.members user, params
  #   if discussion = user.tenant.story_sets.find_by_id(params[:id])
  #     StorySetPresenter.new(discussion).as_story_set_members(user)
  #   else
  #     ApiMessage.new(messages: ['The Discussion Not Found'])
  #   end
  # end
  #
  # def self.as_select_members user, params
  #   if discussion = user.tenant.story_sets.find_by_id(params[:id])
  #     StorySetPresenter.new(discussion).as_select_members user
  #   else
  #     ApiMessage.new(messages: ['The Discussion Not Found'])
  #   end
  # end
  #
  # def self.add_member user, params
  #   unless story_set = user.tenant.story_sets.find_by_id(params[:id])
  #     return ApiMessage.new(messages: ['The Discussion Not Found'])
  #   end
  #
  #   unless member = user.tenant.users.find_by_id(params[:user_id])
  #     return ApiMessage.new(messages: ['The Add Member Not Found'])
  #   end
  #
  #   begin
  #     StorySet.transaction do
  #       su = StorySetUser.new(user_id: params[:user_id])
  #       story_set.story_set_users<<su
  #       StorySetPresenter.new(story_set).as_basic_feedback(['Discussion Member Add Success'], 1)
  #     end
  #   rescue => e
  #     ApiMessage.new(messages: [e.message])
  #   end
  # end
  #
  # def self.remove_member user, params
  #   if (ss=user.tenant.story_sets.find_by_id(params[:id])) && (su=ss.story_set_users.find_by_id(params[:member_id]))
  #     su.destroy
  #     ApiMessage.new(result_code: 1, messages: ['The Discussion Member Delete Success'])
  #   else
  #     return ApiMessage.new(messages: ['The Discussion Or Member Not Found'])
  #   end
  #
  # end

end
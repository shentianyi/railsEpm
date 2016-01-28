#encoding: utf-8
class StoryPresenter<Presenter
  Delegators=[:id, :description, :comment_count, :chart_count, :chart_type, :created_at, :updated_at,
              :title, :user_id, :user_name, :user_title, :email, :closed_at, :status, :story_set_id, :content]
  def_delegators :@story, *Delegators

  def initialize(story)
    @story=story
    self.delegators =Delegators
    # self.user_avatar=User.get_avatar(self.image_url)
  end

  def as_brief_info(with_members=false, user=nil)
    {
        id: @story.id,
        title: @story.title,
        content: @story.content,
        # story_set_id: @story.story_set.id,
        kpi_id: @story.story_set.kpi_id,
        department_id: @story.story_set.department_id,
        creator: UserPresenter.new(@story.user).as_brief_info(false),
        created_at: @story.created_at.utc.to_s,
        closed_at: @story.closed_at.blank? ? nil : @story.closed_at.utc.to_s,
        status: StorySet::StorySetStatus.display(@story.status),
        status_value: @story.status,
        manageable: user==@story.user,
        members: with_members ? UserPresenter.as_brief_infos(@story.story_set.collaborators, false) : nil
    }
  end

  def as_basic_feedback(messages=nil, result_code=nil)
    {
        result_code: result_code||1,
        messages: messages,
        need_instruction: false,
        customized_field: as_brief_info
    }
  end

  def self.as_list stories, user
    infos=[]

    unless stories.blank?
      stories.each do |story|
        infos<<StoryPresenter.new(story).as_brief_info(false, user)
      end
    end

    infos
  end

  def as_add_members_feedback(user, messages=nil, result_code=nil)
    {
        result_code: result_code||1,
        messages: messages,
        need_instruction: false,
        customized_field: as_stories_members(user)
    }
  end

  def as_stories_members(user)
    infos=[]

    members=@story.story_set.story_set_users
    members.each do |member|
      u=User.find_by_id(member.user_id)
      infos<<{
          member_id: member.id,
          user: UserPresenter.new(u).as_brief_info(false),
          removeable: !(user==u)
      }
    end

    infos
  end

  def as_select_members(user)
    infos=[]

    members=@story.story_set.story_set_users.pluck(:user_id)
    user.tenant.users.each do |u|
      unless members.include? u.id
        infos<<UserPresenter.new(u).as_brief_info(false)
      end
    end

    infos
  end

  def self.as_comments comments, base_url
    infos = []

    comments.each do |comment|
      infos<<CommentPresenter.new(comment).as_basic_info(base_url)
    end

    infos
  end


end

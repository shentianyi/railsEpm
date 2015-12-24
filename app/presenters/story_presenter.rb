#encoding: utf-8
class StoryPresenter<Presenter
  Delegators=[:id, :description, :comment_count, :chart_count, :chart_type, :created_at, :updated_at, :title, :user_id, :user_name, :user_title, :email, :closed_at, :status, :story_set_id]
  def_delegators :@story, *Delegators

  def initialize(story)
    @story=story
    self.delegators =Delegators
    # self.user_avatar=User.get_avatar(self.image_url)
  end

  def as_brief_info
    {
        id: @story.id,
        title: @story.title,
        story_set_id: @story.story_set.id,
        kpi_id: @story.story_set.kpi_id,
        department_id: @story.story_set.department_id,
        members: StorySetUserPresenter.as_story_set_users(@story.story_set.story_set_users),
        creator: @story.user_id,
        created_at: @story.created_at,
        closed_on: @story.closed_at,
        status: StorySet::StorySetStatus.display(@story.status),
        status_value: @story.status
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

  def self.as_list stories
    infos=[]

    stories.each do |story|
      infos<<StoryPresenter.new(story).as_basic_feedback
    end

    infos
  end

  def as_stories_members(user)
    infos=[]

    members=@story.story_set.story_set_users.uniq
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

  def self.as_comments story
    infos = []

    story.comments.each do |comment|
      infos<<CommentPresenter.new(comment).as_basic_info
    end

    infos
  end


end

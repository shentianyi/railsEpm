#encoding: utf-8
class StorySetPresenter<Presenter
  Delegators=[:id, :title, :user_id, :tenant_id, :description, :email_alert, :sms_alert, :story_count, :comment_count, :chart_count, :user_count, :kpi_id, :department_id, :closed_at, :status]
  def_delegators :@story_set, *Delegators

  def initialize(story_set)
    @story_set=story_set
    self.delegators =Delegators
  end

  def as_basic_story_set
    {
        id: @story_set.id,
        title: @story_set.title,
        kpi_id: @story_set.kpi_id,
        department_id: @story_set.department_id,
        members: StorySetUserPresenter.as_story_set_users(@story_set.story_set_users),
        creator: @story_set.user_id,
        created_at: @story_set.created_at,
        closed_on: @story_set.closed_at,
        status: StorySet::StorySetStatus.display(@story_set.status),
        status_value: @story_set.status
    }
  end

  def as_basic_feedback(messages=nil, result_code=nil)
    {
        result_code: result_code||1,
        messages: messages,
        need_instruction: false,
        customized_field: as_basic_story_set
    }
  end

  def self.as_list story_sets
    infos=[]

    story_sets.each do |story_set|
      infos<<StorySetPresenter.new(story_set).as_basic_feedback
    end

    infos
  end

  def as_story_set_members(user)
    infos=[]

    members=@story_set.story_set_users.uniq
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


end

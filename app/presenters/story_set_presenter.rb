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
        closed_on: @story_set.closed_at,
        status: StorySet::StorySetStatus.display(@story_set.status),
        status_value: @story_set.status
    }
  end


end

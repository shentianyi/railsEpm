#encoding: utf-8
class UserKpiItemPresenter<Presenter
  Delegators=[:id, :user_id, :kpi_id, :department_id, :user, :kpi_, :department]
  def_delegators :@user_kpi_item, *Delegators

  def initialize(user_kpi_item)
    @user_kpi_item=user_kpi_item
    self.delegators =Delegators
  end


  def as_task_brief_info
    {
        id: @user_kpi_item.id,
        title: "#{@user_kpi_item.kpi_name} for #{@user_kpi_item.department_name}",
        due_flag: false, # TODO
        to_due_at: (Time.now-3.days).utc,
        dued_at: (Time.now-5.days).utc,
        kpi:KpiPresenter.new(@user_kpi_item.kpi).as_basic_info(true),
        department: DepartmentPresenter.new(@user_kpi_item.department).as_brief_info(false)
    }
  end

  def self.as_task_brief_infos(user_kpi_items)
    infos=[]
    user_kpi_items.each do |user_kpi_item|
      infos<<UserKpiItemPresenter.new(user_kpi_item).as_task_brief_info
    end
    infos
  end
end
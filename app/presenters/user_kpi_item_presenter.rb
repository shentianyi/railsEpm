#encoding: utf-8
class UserKpiItemPresenter<Presenter
  Delegators=[:id, :user_id, :kpi_id, :department_id, :user, :kpi, :department, :assigner]
  def_delegators :@user_kpi_item, *Delegators

  def initialize(user_kpi_item)
    @user_kpi_item=user_kpi_item
    self.delegators =Delegators
  end

  def kpi_name
    @kpi_name||=(self.kpi.nil? ? '' : self.kpi.name)
  end

  def department_name
    @department_name||=(self.department.nil? ? '' : self.department.name)
  end

  def task_title
    @task_title||="#{self.kpi_name} for #{self.department_name}"
  end

  def undue_task_item
    @undue_task_item||=Task::EntryItem.last_undue(@user_kpi_item.id)
  end

  def due_task_item
    @due_task_item||=Task::EntryItem.last_due(@user_kpi_item.id)
  end

  def due_flag
    @due_flag||= self.undue_task_item.blank?
  end

  def to_due_at
    @to_due_at||=(self.undue_task_item.blank? ? nil : self.undue_task_item.to_due_at)
  end


  def dued_at
    @dued_at||=(self.due_flag ? (self.due_task_item.blank? ? nil : self.due_task_item.dued_at) : nil)
  end


  def as_task_brief_info
    {
        id: @user_kpi_item.id,
        title: self.task_title,
        due_flag: self.due_flag,
        to_due_at: self.to_due_at,
        dued_at: self.dued_at,
        assigner: UserPresenter.new(self.assigner).as_brief_info(false),
        kpi: KpiPresenter.new(self.kpi).as_basic_info,
        department: DepartmentPresenter.new(self.department).as_brief_info(false)
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
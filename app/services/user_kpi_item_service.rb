class UserKpiItemService

  def self.get_list(user, page=0, size=20)
    UserKpiItemPresenter.as_task_brief_infos(UserKpiItem.details_by_user(user).offset(page*size).limit(size))
  end

  def self.get_task_items(user, task_id, page=0, size=20)
    items=[]
    20.times do |i|
      due=i.odd?
      if i<9
        to_due_at=(Time.now+i.days).utc.to_s
        dued_at= (Time.now+i.days).utc.to_s
      else
        to_due_at=(Time.now-i.days).utc.to_s
        dued_at= (Time.now-i.days).utc.to_s
      end
      status='planed'
      status_value=0
      if due
        to_due_at=(Time.now-i.days).utc.to_s
        dued_at= (Time.now-i.days).utc.to_s
        status=i<6 ? 'due_in_plan' : 'due_after_plan'
        status_value=i<6 ? 1 : 2
      end
      items<<{
          task_item_id: i,
          due_flag: due,
          to_due_at: to_due_at,
          dued_at: dued_at,
          status: status,
          status_value: status_value,
          kpi: KpiPresenter.new(Kpi.first).as_basic_info(true),
          department: DepartmentPresenter.new(Department.first).as_brief_info(false)
      }
    end
    items
  end

  def self.details user, id
    if task=user.user_kpi_items.find_by_id(id)
      UserKpiItemPresenter.new(task).as_task_details_info user
    else
      ApiMessage.new(messages: ['Task Not Found'])
    end
  end
end
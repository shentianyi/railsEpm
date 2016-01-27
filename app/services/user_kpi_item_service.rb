class UserKpiItemService

  def self.get_list(user, page=0, size=20)
    UserKpiItemPresenter.as_task_brief_infos(UserKpiItem.details_by_user(user).offset(page*size).limit(size))
  end

  def self.get_task_items(user, task_id, page=0, size=20)
    Task::EntryItemPresenter.as_basic_infos(
        Task::EntryItem.un_dues(task_id, user).offset(page*size).limit(size)
    )
  end

  def self.details user, id
    if task=user.user_kpi_items.find_by_id(id)
      UserKpiItemPresenter.new(task).as_task_details_info user
    else
      ApiMessage.new(messages: ['Task Not Found'])
    end
  end
end
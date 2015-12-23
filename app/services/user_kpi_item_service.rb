class UserKpiItemService

  def self.get_list(user, page=0, size=20)
    UserKpiItemPresenter.as_task_brief_infos(UserKpiItem.details_by_user(user).offset(page*size).limit(size))
  end
end
class UserGroupService
  def self.create params, user
    ug = user.user_groups.build(name: params[:name])
    ug.tenant = user.tenant

    #user group item
    params[:users].each do |id|
      if user.tenant.users.find_by_id(id)
        item = UserGroupItem.new(user_id: id)
        item.tenant = user.tenant
        ug.user_group_items<<item
      end
    end

    if ug.save
      ApiMessage.new(result_code: 1, messages: ['User Group Create Success'])
    else
      ApiMessage.new(messages: ['User Group Create Error'])
    end
  end

  def self.update params, user
    if ug = UserGroup.find_by_id(params[:id])
      ug.update_attributes(name: params[:name])

      to_delete = ug.user_group_items.pluck(:user_id) - params[:users]
      to_create = params[:users] - ug.user_group_items.pluck(:user_id)

      puts '------------------------------------------'
      puts to_delete
      puts '----------------------------------------------------'
      puts to_create
      puts '------------------------------------------'
      to_delete.each do |id|
        ug.user_group_items.find_by_user_id(id).destroy
      end

      to_create.each do |id|
        item = UserGroupItem.new(user_id: id)
        item.tenant = user.tenant
        ug.user_group_items<<item
      end
    else
      return ApiMessage.new(messages: ['User Group Not Exists'])
    end

    ApiMessage.new(result_code: 1, messages: ['User Group Update Success'])
  end

  def self.details params
    if ug = UserGroup.find_by_id(params[:id])
      UserGroupPresenter.new(ug).as_user_group_details
    else
      ApiMessage.new(messages: ['User Group Not Exists'])
    end
  end

  def self.as_select params

    # if Kpi.find_by_id(params[:kpi_id])
     UserGroupPresenter.for_kpis(UserGroup.all, params[:kpi_id])
    # else
    #   ApiMessage.new(messages: ['Kpi Not Exists'])
    # end
  end
end
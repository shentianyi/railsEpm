#encoding: utf-8
class UserGroupPresenter<Presenter
  Delegators=[:id, :description, :name, :user_id, :tenant_id]
  def_delegators :@user_group, *Delegators

  def initialize(user_group)
    @user_group=user_group
    self.delegators =Delegators
  end

  def as_basic_feedback(messages=nil, result_code=nil)
    {
        result_code: result_code||1,
        messages: messages,
        need_instruction: false,
        customized_field: {
            id:@user_group.id,
            name:@user_group.name,
            members: as_group_members
        }
    }
  end

  def as_user_group_details
    {
        id: @user_group.id,
        name: @user_group.name,
        users: @user_group.user_group_items.pluck(:user_id)
    }
  end

  def as_group_members(limit=3)
    @user_group.users.limit(limit).pluck(:nick_name)
  end

  def as_select(selected=false)
    {
        selected: selected,
        user_group: {
            id: @user_group.id,
            name: @user_group.name,
            user_id: @user_group.user_id,
            members: as_group_members
        }
    }
  end

  def self.for_kpis user_groups, kpi_id
    selects=[]

    user_groups.each do |user_group|
      selects<<UserGroupPresenter.new(user_group).as_select(user_group.user_group_relations.where(user_groupable_type: 'Kpi', user_groupable_id: kpi_id).blank? ? false : true)
    end

    selects
  end

end
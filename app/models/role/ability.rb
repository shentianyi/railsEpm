class Ability
  include CanCan::Ability

  def initialize(user)
    alias_action :read, :show, :update, :destroy, :to => :basic_modify
    alias_action :update, :destroy, :to => :modify

    if user.admin?
      can :manage, [User, Entity, Department, EntityGroupItem, Kpi, KpiCategory, KpiEntry, KpiItem,
                    UserKpiItem, UserSession, Dashboard, DashboardItem, DashboardCondition, Email,
                    KpiProperty, KpiPropertyItem, KpiPropertyValue, StorySet, Story, Comment,
                    ChartCondition, StorySetUser, KpiSubscribe, KpiSubscribeUser, KpiSubscribeAlert, ReportSnap]
      can :manage, UserSession, :email => user.email

      can :read, EntityGroup, user_entity_groups: {user_id: user.id}
      can :manage, EntityGroup, user_id: user.id

      can :create, UserEntityGroup
      can :basic_modify, UserEntityGroup, entity_group: {user_id: user.id}
      can :manage, Department
      can :manage, KpiProperty, user_id: user.id
      #can :read,:all
    elsif user.director?
      can :manage, [EntityGroupItem, UserKpiItem, KpiEntry, Dashboard, DashboardItem, DashboardCondition, Email,
                    KpiProperty, KpiPropertyItem, KpiPropertyValue, StorySet, Story, Comment, ChartCondition,
                    StorySetUser, KpiSubscribe, KpiSubscribeUser, KpiSubscribeAlert]
      can :manage, User, :id => user.id

      can :manage, UserSession, :email => user.email
      can :manage, EntityGroup, user_id: user.id
      can :read, EntityGroup, user_entity_groups: {user_id: user.id}
      can :manage, Entity, entity_group_items: {entity_group: {department: {id: user.user_departments.pluck(:department_id)}}}
      can :create, EntityGroupItem
      can :basic_modify, EntityGroupItem, user_id: user.id

      can :create, UserEntityGroup
      can :basic_modify, UserEntityGroup, entity_group: {user_id: user.id}

      can :read, KpiCategory, kpis: {department_kpis: {department_id: user.user_departments.pluck(:department_id)}}
      can [:read, :access, :access_list, :categoried, :properties, :group_properties], Kpi, department_kpis: {department_id: user.user_departments.pluck(:department_id)}
      #can :read, Department, user_id: user.id
      can [:read, :property_value], KpiProperty
      can :read, [KpiPropertyItem, KpiPropertyValue]
      can :manage, ReportSnap, user_id: user.id
    elsif user.user?
      can :manage, User, :id => user.id
      can :manage, UserSession, :email => user.email
      can :read, Entity, :id => user.entity_id
      can :create, EntityGroup
      can :basic_modify, EntityGroup, :user_id => user.id

      can :create, EntityGroupItem
      can :basic_modify, EntityGroupItem, user_id: user.id

      can :read, KpiCategory, kpis: {user_kpi_items: {user_id: user.id}}
      can [:read, :categoried, :access, :access_list, :properties, :group_properties], Kpi, user_kpi_items: {user_id: user.id}

      can :manage, UserKpiItem, :user_id => user.id
      can :manage, KpiEntry, :user_id => user.id

      can :manage, Email, :user_id => user.id
      can :read, [KpiProperty, KpiPropertyItem, StorySet, Story, Comment, ChartCondition, StorySetUser, KpiSubscribe, KpiSubscribeUser, KpiSubscribeAlert]
      can :manage, KpiPropertyValue
      can :download_entry_template,Kpi
    end
  end
end

class Ability
  include CanCan::Ability
  def initialize(user)
    if user.admin?
      can :manage,:all
    elsif user.director?
      can :manage,[Entity,EntityGroup,EntityGroupItem,Kpi,KpiCategory,KpiEntry,KpiItem,User,UserKpiItem,UserSession,Dashboard,DashboardItem,DashboardCondition,Email]
      can :read,:all
    #elsif Role.manager?(user.role_id)
    #  can :manage,User,:entity_id=>user.entity_id
    #  # can :manage,Entity,:id=>user.entity_id
    #  can :manage,[Entity,EntityGroup,EntityGroupItem,Kpi,KpiEntry,KpiItem,User,UserKpiItem,UserSession,Dashboard,DashboardItem,DashboardCondition,KpiCategory,Email]
    #  can :read, KpiCategory,:tenant_id=>user.tenant_id
    #  can :read,:all
    elsif user.user?
      can :manage,User,:id=>user.id
      #can :manage,[KpiEntry,UserSession,Email]
      can :manage,KpiEntry
      can :manage,Email,:user_id=>user.id
      #can :read,:all
    end
  end
end

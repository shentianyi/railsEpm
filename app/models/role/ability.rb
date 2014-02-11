class Ability
  include CanCan::Ability
  def initialize(user)
    if user.admin?
      can :manage,[Entity,EntityGroup,EntityGroupItem,Kpi,KpiCategory,KpiEntry,KpiItem,UserKpiItem,UserSession,Dashboard,DashboardItem,DashboardCondition,Email]
      can :manage,User,:id=>user.id
      can :manage,UserSession,:email=>user.email
      can :read,EntityGroup,:is_public=>true
      can :manage,EntityGroup,:user_id=>user.id
      can :read,:all
    elsif user.director?
      can :manage,[Entity,EntityGroup,EntityGroupItem,Kpi,KpiCategory,KpiEntry,KpiItem,UserKpiItem,UserSession,Dashboard,DashboardItem,DashboardCondition,Email]
      can :manage,User,:id=>user.id
      can :manage,UserSession,:email=>user.email
      can :read,EntityGroup,:is_public=>true
      can :manage,EntityGroup,:user_id=>user.id
      #can :read,:all
    elsif user.user?
      can :manage,User,:id=>user.id
      can :manage,UserSession,:email=>user.email
      can :manage,KpiEntry
      can :manage,EntityGroup,:user_id=>user.id
      can :manage,Email,:user_id=>user.id
      #can :read,:all
    end
  end
end

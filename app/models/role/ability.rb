class Ability
  include CanCan::Ability
  def initialize(user)
    alias_action :read,:show,:update,:destroy,:to=>:basic_modify
    alias_action :update,:destroy,:to=>:modify

    if user.admin?
      can :manage,[User,Entity,EntityGroup,EntityGroupItem,Kpi,KpiCategory,KpiEntry,KpiItem,UserKpiItem,UserSession,Dashboard,DashboardItem,DashboardCondition,Email]
      #can :manage,User,:id=>user.id
      can :manage,UserSession,:email=>user.email
      #can :read,EntityGroup,:is_public=>true
      #can :manage,EntityGroup,:user_id=>user.id
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

      can :read,Entity,:id=>user.entity_id

      can :create,EntityGroup
      can :basic_modify,EntityGroup,:user_id=>user.id

      can :create,EntityGroupItem
      can :basic_modify,EntityGroupItem,entity_group:{id:user.entity_id}

      can :read,KpiCategory,kpis:{user_kpi_items:{user_id:user.id}}
      can :read,Kpi,user_kpi_items:{user_id:user.id}
      can :categoried,Kpi
      can :manage,UserKpiItem,:user_id=>user.id
      can :manage,KpiEntry,:user_id=>user.id

      can :manage,Email,:user_id=>user.id
      #can :read,:all
    end
  end
end

class Ability
  include CanCan::Ability
  def initialize(user)
    alias_action :read,:show,:update,:destroy,:to=>:basic_modify
    alias_action :update,:destroy,:to=>:modify

    if user.admin?
      can :manage,[User,Entity,Department,EntityGroupItem,Kpi,KpiCategory,KpiEntry,KpiItem,UserKpiItem,UserSession,Dashboard,DashboardItem,DashboardCondition,Email]
      #can :manage,User,:id=>user.id
      can :manage,UserSession,:email=>user.email
      #can :manage,EntityGroup,:is_public=>true
      #can :manage,EntityGroup,:user_id=>user.id
      can :manage,EntityGroup,user_entity_groups:{user_id:user.id}
      can :manage,Department
      #can :read,:all
    elsif user.director?
      can :manage,[EntityGroupItem,KpiEntry,Dashboard,DashboardItem,DashboardCondition,Email]
      can :manage,User,:id=>user.id

      can :manage,UserSession,:email=>user.email
      can :manage,EntityGroup,{user_id:user.id}
      can :read,EntityGroup,user_entity_groups:{user_id:user.id}
      can :manage,Entity,entity_group_items:{entity_group:{department:{id:user.user_departments.pluck(:id)}}}

      can :read,KpiCategory,kpis:{department_kpis:{department_id:user.user_departments.pluck(:id)}}
      can  [:read,:access,:categoried],Kpi,department_kpis:{department_id:user.user_departments.pluck(:id)}
      #can :read,KpiCategory,kpis:{user_kpi_items:{entity_id:EntityGroupItem.where(:entity_group_id => user.entity_group).pluck(:id)}}
      #can [:read,:access,:categoried],Kpi,user_kpi_items:{entity_id:EntityGroupItem.where(:entity_group_id => user.user_entity_groups.pluck(:id)).pluck(:entity_id)}
      #can :read,KpiCategory

      #can :read,:all
    elsif user.user?
      can :manage,User,:id=>user.id
      can :manage,UserSession,:email=>user.email
      can :read,Entity,:id=>user.entity_id
      can :create,EntityGroup
      can :basic_modify,EntityGroup,:user_id=>user.id

      can :create,EntityGroupItem
      can :basic_modify,EntityGroupItem,entity_group:{id:user.entity_group_id}

      can :read,KpiCategory,kpis:{user_kpi_items:{user_id:user.id}}
      can [:read,:categoried],Kpi,user_kpi_items:{user_id:user.id}
      #can :categoried,Kpi
      can :manage,UserKpiItem,:user_id=>user.id
      can :manage,KpiEntry,:user_id=>user.id

      can :manage,Email,:user_id=>user.id
      #can :read,:all
    end
  end
end

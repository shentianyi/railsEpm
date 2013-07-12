class Ability
  include CanCan::Ability
  def initialize(user)
    if Role.admin?(user.role_id)
      can :manage,:all
    elsif Role.director?(user.role_id)
      can :manage,[Entity,EntityGroup,EntityGroupItem,Kpi,KpiCategory,KpiEntry,KpiItem,User,UserKpiItem]
      can :read,:all
    elsif Role.manager?(user.role_id)
      can :manage,User,:entity_id=>user.entity_id
      can :manage,Entity,:id=>user.entity_id
      can :manage,Kpi
      can :read, KpiCategory,:tenant_id=>user.tenant_id
      can :read,:all
    elsif Role.user?(user.role_id)
      can :manage,User,:id=>user.entity_id
      can :manage,KpiEntry
      can :read,:all
    end
  end
end
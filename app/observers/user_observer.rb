#encoding: utf-8
class UserObserver<ActiveRecord::Observer
  observe :user
  #def before_create user
  #  #user.tenant.update_attributes(:user_quantity=>user.tenant.user_quantity+1)
  #  user.entity.increment!(:user_quantity) if user.entity
  #end

  def after_update user
    if user.entity_id_changed?
      user.user_kpi_items.update_all(:entity_id => user.entity_id)
      if entity=user.entity
        entity.increment!(:user_quantity)
        department_id=entity.department_id
      end
      unless user.entity_id_was.blank?
        if  entity=Entity.find_by_id(user.entity_id_was)
          entity.decrement!(:user_quantity)
          department_id_was=entity.department_id
        end
      end
      UserKpiItem.reinit_department_kpis(user, department_id, department_id_was)
    end
    if user.department_id_changed?
      UserKpiItem.reinit_department_kpis(user, user.department_id, user.department_id_was)
    end
  end

  def before_update user
    if user.role_id_changed?
      user.role_id=user.role_id_was if user.is_tenant
    end
  end

  def after_create user
    user.entity.increment!(:user_quantity) if user.entity
    user.insert_guide_template
  end
end

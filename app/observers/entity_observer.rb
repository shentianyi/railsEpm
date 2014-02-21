#encoding: utf-8
class EntityObserver<ActiveRecord::Observer
  observe :entity

  def after_destroy entity
    entity.users.update_all(:entity_id => nil)
  end

  def after_update entity
    if entity.department_id_changed?
      UserKpiItem.reinit_department_kpis(entity,entity.department_id,entity.department_id_was)
    end
  end
end

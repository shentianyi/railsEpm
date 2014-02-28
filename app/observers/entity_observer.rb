#encoding: utf-8
class EntityObserver<ActiveRecord::Observer
  observe :entity

  def after_destroy entity
    entity.users.update_all(:entity_id => nil)
  end

  def after_update entity
    if entity.department_id_changed?
      UserKpiItem.reinit_department_kpis(entity,entity.department_id,entity.department_id_was)

      #work with EntityDepartment
      if entity.department_id_was
        if department = Department.find_by_id(entity.department_id_was)
          department.path.each do |d|
            if entity_group_item = EntityGroupItem.find_by_entity_id_and_entity_group_id(entity.id,d.entity_group.id)
              entity_group_item.destroy
            end
          end
        end
      end

      if entity.department_id
        entity.department.path.each do |d|
          entity_group_item = EntityGroupItem.new(:entity_id => entity.id,:entity_group_id=>d.entity_group.id)
          entity_group_item.save
        end
      end
    end
  end
end

#encoding: utf-8
class DepartmentObserver<ActiveRecord::Observer
  observe :department


  def after_create department
    entity_group = EntityGroup.new(:name => department.name, :department_id => department.id)
    entity_group.creator = department.creator
    entity_group.tenant=department.tenant
    entity_group.entities<<department.default_entity if department.default_entity
    entity_group.save

    #share department.entity_group to all the ancestors' users
    department.ancestors.each do |d|
      d.users.each do |u|
        if d.entity_group
          ueg = u.user_entity_groups.build
          ueg.entity_group = department.entity_group
          ueg.save
        end
      end
    end
  end

  def after_update department
    if department.name_changed?
      eg = department.entity_group
      eg.update_attribute("name", department.name)
    end
  end

  def after_destroy department
    department.entities.all.each do |e|
      e.department.path.each do |d|
        if entity_group_item = EntityGroupItem.find_by_entity_id_and_entity_group_id(e.id,d.entity_group.id)
          entity_group_item.destroy
        end
      end
    end
  end
end
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
end
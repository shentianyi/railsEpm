#encoding: utf-8
class DepartmentObserver<ActiveRecord::Observer
  observe :department


  def after_create department

    # create entity group
    entity_group = EntityGroup.new(name: department.name, code: department.name, department_id: department.id)
    entity_group.creator = department.creator
    entity_group.tenant=department.tenant

    unless entity=Entity.find_by_code(department.name)
      # create entity
      entity=Entity.new(name: department.name, code: department.name, department_id: department.id)
      #create user
      user=User.new(first_name: "#{department.name}_user",
                    email: "#{department.name.gsub(/ /, '_')}_user@beko.com",
                    password: '123456@', password_confirmation: '123456@', role_id: 100)
      entity.tenant=department.tenant
      entity.users<<user
    end
    entity_group.entities<<department.default_entity if department.default_entity
    entity_group.entities<<entity

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
      # eg.update_attributes(name:department.name,code:department.name)
      eg.update_attributes(name: department.name)
    end
  end

  def before_destroy department

  end
end

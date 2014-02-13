#encoding: utf-8
class UserObserver<ActiveRecord::Observer
  observe :user
  #def before_create user
  #  #user.tenant.update_attributes(:user_quantity=>user.tenant.user_quantity+1)
  #  user.entity.increment!(:user_quantity) if user.entity
  #end

  def after_update user
    if user.entity_id_changed?

       #if user.entity_id.blank?
       #  user.user_kpi_items.delete_all
       #else
         user.user_kpi_items.update_all(:entity_id => user.entity_id)
       #end

      user.entity.increment!(:user_quantity) if user.entity
      Entity.find_by_id(user.entity_id_was).decrement!(:user_quantity) unless user.entity_id_was.blank?
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

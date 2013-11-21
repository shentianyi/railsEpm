#encoding: utf-8
class UserObserver<ActiveRecord::Observer
  observe :user
  def before_create user
    #user.tenant.update_attributes(:user_quantity=>user.tenant.user_quantity+1)
    user.entity.update_attributes(:user_quantity=>user.entity.user_quantity+1)

  end

  def after_update user
    if user.entity_id_changed?
      user.user_kpi_items.update_all(:entity_id=>user.entity_id)
    end

  end

  def before_update user
    user.role_id=user.role_id_was if user.is_tenant
  end

  def after_create user
    user.insert_guide_template
  end
end

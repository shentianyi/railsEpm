#encoding: utf-8
class UserObserver<ActiveRecord::Observer
  observe :user
  def before_create user
    user.tenant.update_attributes(:user_quantity=>user.tenant.user_quantity+1)
    user.entity.update_attributes(:user_quantity=>user.entity.user_quantity+1)
  end

end
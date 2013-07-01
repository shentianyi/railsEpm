#encoding: utf-8
class UserObserver<ActiveRecord::Observer
 observe :user
 def before_create user
  user.tenant.user_quantity+=1    
 end
 
 
end

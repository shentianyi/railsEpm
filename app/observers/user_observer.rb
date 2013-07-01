#encoding: utf-8
class UserObserver<ActiveRecord::Observer
 observe :user
 def before_create user
   if user.is_tenant
     
   end  
 end
 
 
end

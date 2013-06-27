#encoding: utf-8
class UserObserver<ActiveRecord::Observer
 observe :user
 def before_create user
   if user.is_tenant
     tenant=user.tenant
     entity=Entity.new(:name=>tenant.company)
     user.tenant.entities<<entity
     user.user_entities<<UserEntity.new(:entity_id=>entity.id)
     tenant.save
   end  
 end
end

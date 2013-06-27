#encoding: utf-8
class TenantObserver<ActiveRecord::Observer
 observe :tenant

 def before_create tenant
   # create a default entiry
   # tenant.entities<< Entity.new(:name=>tenant.company)
 end
end

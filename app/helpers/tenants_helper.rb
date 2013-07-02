#encoding: utf-8
module TenantsHelper
    # init tenant when user reg for try
    def self.init_tenant params
	begin
	    super_user=User.new(:first_name=>params[:first_name],:last_name=>params[:last_name],:is_tenant=>true,:password=>params[:password])
	    tenant=Tenant.new(:company=>params[:company])
	    super_user.tenant=tenant
	    tenant.super_user=super_user
	    tenant.save
	rescue Exception=>e
	    puts e.message
	    return false
	end
	return true
    end
end

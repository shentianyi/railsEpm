Tenant.destroy_all
params={:first_name=>'Home',:last_name=>'Jack',:password=>'1',:company=>'CZ',:email=>'jack@g.com'}

puts TenantsHelper.init_tenant params


category=KpiCategory.first
user=User.first
tenant=Tenant.first
(1..4).each do |i|
unless Kpi.find_by_name("kpi#{i}")
kpi=Kpi.new(:name=>"kpi#{i}",:target=>i*100,:unit=>i*100,:frequency=>100)
kpi.kpi_category=category
kpi.creator=user
kpi.tenant=tenant
kpi.save
end
end

unless Kpi.find_by_name("kpi_add")
kpi=Kpi.new(:name=>"kpi_add",:target=>100,:unit=>100,:frequency=>100,:is_calculated=>true,:formula=>'[1]+[2]')
kpi.kpi_category=category
kpi.creator=user
kpi.tenant=tenant
kpi.save
end
KpisHelper.assign_kpi_to_user_by_category category.id,user.id

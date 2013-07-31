#encoding: utf-8

ActiveRecord::Base.transaction do
  user=User.new
  user.status=0
  user =user.create_tenant_user!('admin@leoni.com','123456@',"123456@","Shanghai Leoni")
  tenant=user.tenant
  
  puts '*************** TENANT AND ADMIN***************'
  puts "tenant-----#{tenant.id}:#{tenant.company_name} created!"
  puts "user-----#{user.id}:#{user.email} created!"
  # create kpis

  kpi_category=tenant.kpi_categories.first
  kpis=[
    {:name=>"WorkerAttendanceKpi",:description=>"出勤人数KPI",:direction=>KpiDirection::Up,:frequency=>KpiFrequency::Hourly,:is_calculated=>false,:target=>100,:unit=>KpiUnit::IntUnit},
    {:name=>"ProductTestTotalQuantityKpi",:description=>"产品总测试数量KPI",:direction=>KpiDirection::Up,:frequency=>KpiFrequency::Hourly,:is_calculated=>false,:target=>100,:unit=>KpiUnit::IntUnit},
    {:name=>"ProductTestPassQuantityKpi",:description=>"产品测试通过数量KPI",:direction=>KpiDirection::Up,:frequency=>KpiFrequency::Hourly,:is_calculated=>false,:target=>100,:unit=>KpiUnit::IntUnit},
    {:name=>"ProductTestFailQuantityKpi",:description=>"产品测试失败数量KPI",:direction=>KpiDirection::Down,:frequency=>KpiFrequency::Hourly,:is_calculated=>false,:target=>100,:unit=>KpiUnit::IntUnit},
    {:name=>"ProductQuantityKpi",:description=>"产品产量KPI",:direction=>KpiDirection::Up,:frequency=>KpiFrequency::Hourly,:is_calculated=>false,:target=>100,:unit=>KpiUnit::IntUnit},
    {:name=>"WorkerAttendanceTimeKpi",:description=>"出勤总时间KPI",:direction=>KpiDirection::Up,:frequency=>KpiFrequency::Hourly,:is_calculated=>false,:target=>100,:unit=>KpiUnit::FloatUnit},
    {:name=>"ProductTotalTargetTimeKpi",:description=>"产品理论生产总时间KPI",:direction=>KpiDirection::Up,:frequency=>KpiFrequency::Hourly,:is_calculated=>false,:target=>100,:unit=>KpiUnit::FloatUnit},
    {:name=>"E1Kpi",:description=>"E1Kpi",:direction=>KpiDirection::Up,:frequency=>KpiFrequency::Hourly,:is_calculated=>true,:target=>100,:unit=>KpiUnit::FloatUnit,:formula=>"[7]/[6]",:formula_string=>"[ProductTotalTargetTimeKpi]/[WorkerAttendanceTimeKpi]"}
  ]
  puts '*************** CREATE KPI ***************'
  kpis.each do |k|
    kpi=Kpi.new(k)
    kpi.creator=user
    kpi.tenant=tenant
    kpi.kpi_category=kpi_category
    kpi.save
    puts "kpi------#{kpi.id}:#{kpi.name} created!"
  end

  entities=[{:name=>'C-RBA'},{:name=>'G-RBA'},{:name=>'E-RBA'},{:name=>'C-COC'},{:name=>'G-COC'},{:name=>'E-COC'},
    {:name=>'C-MRA'},{:name=>'G-MRA'},{:name=>'E-MRA'},{:name=>'Minor'},{:name=>'Motor'},{:name=>'NCV2-COC'},
    {:name=>'NCV2-INR'},{:name=>'NCV2-MRA'},{:name=>'NCV2-Minor'},{:name=>'NCV3-COC'},
    {:name=>'NCV3-BODY'},{:name=>'NCV3-ROOF'},{:name=>'NCV3-Minor'},{:name=>'C-G-COC'},{:name=>'C-G-MRA'},{:name=>'NCV2-3'}]

  users=[{:first_name=>'C-RBA_User',:email=>'C-RBA_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'G-RBA_User',:email=>'G-RBA_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'E-RBA_User',:email=>'E-RBA_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'C-COC_User',:email=>'C-COC_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'G-COC_User',:email=>'G-COC_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'E-COC_User',:email=>'E-COC_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'C-MRA_User',:email=>'C-MRA_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'G-MRA_User',:email=>'G-MRA_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'E-MRA_User',:email=>'E-MRA_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'Minor_User',:email=>'Minor_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'Motor_User',:email=>'Motor_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'NCV2-COC_User',:email=>'NCV2-COC_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'NCV2-INR_User',:email=>'NCV2-INR_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'NCV2-MRA_User',:email=>'NCV2-MRA_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'NCV2-Minor_User',:email=>'NCV2-Minor_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'NCV3-COC_User',:email=>'NCV3-COC_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'NCV3-BODY_User',:email=>'NCV3-BODY_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'NCV3-ROOF_User',:email=>'NCV3-ROOF_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'NCV3-Minor_User',:email=>'NCV3-Minor_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'C-G-COC_User',:email=>'C-G-COC_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'C-G-MRA_User',:email=>'C-G-MRA_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'},
    {:first_name=>'NCV2-3_User',:email=>'NCV2-3_User@leoni.com',:role_id=>400,:password=>'123456@',:password_confirmation=>'123456@'}
  ]

  puts '*************** CREATE ENTITY, USER, USER_KPI_ITEM, ENTITY_GROUP, ENTITY_GROUP_ITEM ***************'
  entities.each_with_index do |entity,i|

    entity=Entity.new(entity)
    entity.tenant=tenant
    entity.save

    puts "entity-----#{entity.id}:#{entity.name} created!"

    euser=User.new(users[i])
    euser.tenant=tenant
    euser.entity=entity
    euser.save
    puts "user-----#{euser.id}:#{euser.email} created!"

    eg=EntityGroup.new(:name=>entity[:name]+"_Observer")
    eg.user=user
    eg.save
    puts "entity_group-----#{eg.id}:#{eg.name} created!"

    egi=EntityGroupItem.new
    egi.entity=entity
    egi.entity_group=eg
    egi.save
    puts "entity_group_item-----#{egi.id}:#{egi.entity.name}:#{egi.entity_group.name} created!"
    Kpi.all.each do |kpi|
      uki=UserKpiItem.new(:target=>kpi.target)
      uki.user=euser
      uki.kpi=kpi
      uki.entity=entity
      uki.save
      puts "user_kpi_item-----#{uki.id}:#{uki.entity.name}:#{uki.user.email}:#{uki.kpi.name} created!"
    end
  end
end
if user=User.find_by_email('admin@ci.com')
  tenant=user.tenant
  department=tenant.departments.first



  #follow kpi
  Kpi.all.each do |k|
  
    KpiService.follow_kpi({
                              user: user,
                              lower_boundary: 100,
                              upper_boundary: 20,
                              ks: {
                                  kpi_id: k.id,
                                  department_id: department.id,
                                  auto_notification: true
                              }
                          })
  end

end

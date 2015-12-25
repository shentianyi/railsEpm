if user=User.find_by_email('admin@ci.com')
  tenant=user.tenant
  department=tenant.departments.first

  # add child departments
  d=[]
  3.times do |i|
    DepartmentService.create_department(
        {
            name: "department_#{i}",
            description: "department_#{i} description",
            parent_id: department.id
        },
        user)
  end

  Department.all.each do |department|
    d<<department
  end

  #create User Group
  UserGroupService.create({
                                 name: "user_group",
                                 users: [4,5,6,7,8,9]
                             }, user)

  ug=UserGroup.last

  # create KPI
  k=[]
  3.times do |i|
    KpiService.building(
        {
            kpi: {
                kpi_name: "kpi_#{i}",
                description: "kpi_#{i}",
                target_max: 12345,
                target_min: 3,
                uom: 100,
                calculate_method: 100,
                viewable: {
                    viewable_code: 2,
                    user_group_id: ug.id
                },
                attributes: [
                    {
                        attribute_name: "p15",
                        attribute_type: 1
                    }
                ]
            },

            assignments: [
                {
                    user: "admin@ci.com",
                    department_id: 12,
                    time: "2015-6-8",
                    frequency: 100
                }
            ]
        },
        user)
  end

  Kpi.all.each do |kpi|
    k<<kpi
  end


  #follow kpi
  3.times do |i|
    KpiService.follow_kpi({
                              user: user,
                              lower_boundary: 100,
                              upper_boundary: 20,
                              ks: {
                                  kpi_id: k[i].id,
                                  department_id: d[i].id,
                                  auto_notification: false
                              }
                          })
  end

end
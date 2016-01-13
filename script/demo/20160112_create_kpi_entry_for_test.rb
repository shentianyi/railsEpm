Kpi.transaction do
  start_time=Time.parse('2000-11-09').utc
  end_time=Time.parse('2016-11-09').utc


  kpi=Kpi.first
  kpi.update_attributes(frequency: KpiFrequency::Daily)
  department=Department.first
  user=User.find_by_email('admin@ci.com')

  a=%w(a1 a2 a3 a4 a5 a6)
  b=%w(b1 b2 b3 b4 b5 b6)
  while start_time<end_time
    params={
        data: {
            kpi_id: kpi.id,
            department_id: department.id,
            data: {
                value: rand(100),
                time: start_time,
                attributes: [
                    {
                        attribute_id: 96,
                        attribute_value: a[rand(6)]
                    },

                    {
                        attribute_id: 97,
                        attribute_value: b[rand(6)]
                    }
                ]
            }
        }
    }
    EntryService.create_entry(params, user)

    start_time+=1.day

  end
end

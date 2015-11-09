start_time=Time.parse('2000-11-09').utc
end_time=Time.parse('2016-11-09').utc

kpi=Kpi.find(3)
user=User.find_by_email('excel@ci.com')
user_kpi_item=UserKpiItem.find_by_user_id_and_kpi_id(user.id, kpi.id)

while start_time<end_time
  params={
      base_attrs: {
          kpi_id: kpi.id,
          user_id: user.id,
          user_kpi_item_id: user_kpi_item.id,
          entity_id: user_kpi_item.entity_id,
          target_min: user_kpi_item.target_min,
          target_max: user_kpi_item.target_max,
          entry_at: start_time,
          original_value: rand(100)
      }
  }
  p params
  Entry::OperateService.new.insert_entry(params)

  start_time+=1.day

end


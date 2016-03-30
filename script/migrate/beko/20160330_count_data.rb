start_time=(Time.now-1.day).beginning_of_day.utc
end_time=(start_time+18.hours-1.second)
p start_time
p end_time

Department.find_by_name('FL').children.each do |dd|
  dd.children.each do |d|
    eg=d.entity_group
    e= eg.entities.first
    q = KpiEntry.where(kpi_id: Kpi.first.id,
                       entity_id: e.id)

    q=q.between(Hash[:entry_at, (start_time..end_time)])
    p "#{eg.name}:#{e.code}:#{q.count}"
  end
end
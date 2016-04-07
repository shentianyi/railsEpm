start_time=(Time.now.beginning_of_day-2.days).utc
end_time=Time.now.utc+12.hours#(start_time+18.hours-1.second)
p start_time
p end_time

Department.find_by_name('TL').children.each do |dd|
  dd.children.each do |d|
    eg=d.entity_group
    e= eg.entities.first
    q = KpiEntry.where(kpi_id: Kpi.first.id,
                       entity_id: e.id)

    q=q.between(Hash[:entry_at, (start_time..end_time)])
   q.destroy_all
  end
end

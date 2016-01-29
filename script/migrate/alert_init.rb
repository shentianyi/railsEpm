

[Task::EntryItem, KpiSubscribe, UserKpiItem, StorySetUser, UserDepartment].all.each do |i|
  i.produce_alert
end

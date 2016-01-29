[Task::EntryItem, KpiSubscribe, UserKpiItem, StorySetUser, UserDepartment].each do |m|
  m.all.each do |i|
    i.produce_alert
  end
end

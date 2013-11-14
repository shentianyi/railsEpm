Kpi.where(:target_min=>nil).update_all(:target_min=>0)
UserKpiItem.where(:target_min=>nil).update_all(:target_min=>0)
KpiEntry.where(:target_min=>nil).update_all(:target_min=>0)

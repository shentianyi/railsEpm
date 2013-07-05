UserKpiItem.all.each do |item|
 params={:id=>item.id,:entry_at=>'2013-1-1',:value=>100,:kpi=>item.kpi_id}
unless item.kpi.is_calculated
 KpiEntriesHelper.create_update_kpi_entry params
end
end

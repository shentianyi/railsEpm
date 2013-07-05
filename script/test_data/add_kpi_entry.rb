KpiEntry.destroy_all

UserKpiItem.all.each_with_index do |item,i|
  if i%2==0
    params={:id=>item.id,:entry_at=>'2013-1-11',:value=>12*i,:kpi=>item.kpi_id}
    unless item.kpi.is_calculated
      KpiEntriesHelper.create_update_kpi_entry params
    end
  end
end

KpiEntry.destroy_all
 
UserKpiItem.all.each_with_index do |item,i|
 (1..30).each do |ii|
    params={:id=>item.id,:entry_at=>"2013-1-#{ii}",:value=>12*ii,:kpi=>item.kpi_id}
    unless item.kpi.is_calculated
     KpiEntriesHelper.create_update_kpi_entry(params)
    end
 end
end

#encoding: utf-8
module KpiEntryAnalyseHelper
 def self.get_kpi_entry_analysis_data kpi_id,entity_group_id,start_time,end_time
	if kpi=Kpi.find_by_id(kpi_id) and entity_group=EntityGroup.find_by_id(entity_group_id)
	    entity_ids=entity_group.entities.collect{|entity| entity.id}
	    start_time,end_time=DateTimeHelper.get_utc_time_by_str(start_time),DateTimeHelper.get_utc_time_by_str(end_time)
	    entries=  KpiEntry.where(:kpi_id=>kpi_id,:entity_id=>entity_ids,:parsed_entry_at=>start_time..end_time).all
	    target=UserKpiItem.where(:kpi_id=>kpi_id,:entity_id=>entity_ids).sum(:target)
	    current_data={};target_data={};unit_data={}    
	    case   kpi.frequency
	    when KpiFrequency::Hourly
	     	start_hour=DateTimeHelper.get_utc_time_by_str(start_time)
	    	end_hour=DateTimeHelper.get_utc_time_by_str(end_time)
        while start_hour<=end_hour do 
		      key=start_hour.to_s
		      current_data[key]=0
		      target_data[key]=target
		      unit_data[key]=KpiUnit.get_entry_unit_sym kpi.unit
		      start_hour=start_hour+60*60
		     end 
	    when KpiFrequency::Daily
	      	date=start_date=Date.parse(start_time)
		      end_date=Date.parse(end_time)
		      days=end_date.mjd-start_date.mjd
	       	for i in 0..days
		        key=date.to_s
		        current_data[key]=0
		        target_data[key]=target
		        unit_data[key]=KpiUnit.get_entry_unit_sym kpi.unit
		       date=date.next
		      end 
	    when KpiFrequency::Weekly,KpiFrequency::Monthly,KpiFrequency::Quarterly
		  

	    when KpiFrequency::Yearly
		    for i in start_time.year..end_time.year
		       key=i.to_s
		       current_data[key]=0
		       target_data[key]=target
		       unit_data[key]=KpiUnit.get_entry_unit_sym kpi.unit
		    end
	    end

	      entries.each do |entry|
		       current_data[entry.entry_at]+= entry.value
	      end
	       return {:current=>current_data.values,:target=>target_data.values,:unit=>unit_data.values}
	     end
	    return nil
    end
end

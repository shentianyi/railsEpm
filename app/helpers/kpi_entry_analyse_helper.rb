#encoding: utf-8
module KpiEntryAnalyseHelper

    def self.get_kpi_entry_analysis_data kpi_id,entity_group_id,start_time,end_time
	if kpi=Kpi.find_by_id(kpi_id) and entity_group=EntityGroup.find_by_id(entity_group_id)
	    entities=entity_group.entities
	    entity_ids=entities.collect{|entity| entity.id}
	    entries=  KpiEntry.where(:kpi_id=>kpi_id,:entity_id=>entity_ids,:entry_at=>start_time..end_time).all
	    target=UserKpiItem.where(:kpi_id=>kpi_id,:entity_id=>entity_ids).sum(:target)
	    current_data={};target_data={};unit_data={}    
	    case   kpi.frequency
	    when KpiFrequency::Hourly

	    when KpiFrequency::Daily
		date=start_date=Date.parse(start_time)
		end_date=Date.parse(end_time)
		days=end_date.mjd-start_date.mjd+1
		for i in 0..days
		    key=date.to_s
		    current_data[key]=0
		    target_data[key]=target
		    unit_data[key]=KpiUnit.get_entry_unit_sym kpi.unit
		    date=date.next
		end

		entries.each do |entry|
		    current_data[entry.entry_at]+= entry.value
		end

	    when KpiFrequency::Weekly
		start_date=start_time.split('-')
		end_date=end_time.split('-')
		start_year,start_week=start_date[0].to_i,start_date[1].to_i
		end_year,end_week=end_date[0].to_i,end_date[1].to_i

		for year in start_year..end_year
		    if year==start_year
			if end_year>start_year
			generate_week_data start_week,52,year,target,current_data,target_data,unit_data
			else
			generate_week_data start_week,end_week,year,target,current_data,target_data,unit_data
			end
		    elsif year==end_year
			generate_week_data 1,end_week,year,target,current_data,target_data,unit_data
		    else
			generate_week_data 1,52,year,target,current_data,target_data,unit_data

		    end
		end
		entries.each do |entry|
		    current_data[entry.entry_at]+= entry.value
		end
	    when KpiFrequency::Monthly

	    end
	    return {:current=>current_data.values,:target=>target_data.values,:unit=>unit_data.values}
	end
	return nil
    end

    private
    def self.generate_week_data start_index,end_index,year,target,current_data,target_data,unit_data,kpi
	for week in start_index..end_index
			    key="#{year}-#{week}"
			    current_data[key]=0
			    target_data[key]=target
			    unit_data[key]=KpiUnit.get_entry_unit_sym kpi.unit
			end
    end

end

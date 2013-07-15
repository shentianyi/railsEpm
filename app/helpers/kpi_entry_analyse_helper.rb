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
	      start_hour=DateTimeHelper.parse_string_to_date_hour(start_time)
	      end_hour=DateTimeHelper.parse_string_to_date_hour(end_time)
	     
	      while start_hour<end_hour do 
	        key=DateTimeHelper.parse_time_to_hour_string(start_hour)
	        puts key
	          current_data[key]=0
            target_data[key]=target
            unit_data[key]=KpiUnit.get_entry_unit_sym kpi.unit
            start_hour=start_hour.advance :hours=>1
	      end 
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
	    when KpiFrequency::Weekly,KpiFrequency::Monthly,KpiFrequency::Quarterly
		start_date=start_time.split('-')
		end_date=end_time.split('-')
		start_index_a,start_index_b=start_date[0].to_i,start_date[1].to_i
		end_index_a,end_index_b=end_date[0].to_i,end_date[1].to_i
                step=0
		case kpi.frequency
		  when KpiFrequency::Weekly
		     step=52
		  when KpiFrequency::Monthly
		     step=12
		  when KpiFrequency::Quarterly
		     step=4 
		end 
		for start_index in start_index_a..end_index_a
		    if start_index==start_index_a
			if end_index_a>start_index_a
			generate_cycle_data start_index_b,step,start_index,target,current_data,target_data,unit_data,kpi
			else
			generate_cycle_data start_index_b,end_index_b,start_index,target,current_data,target_data,unit_data,kpi
			end
		    elsif start_index==end_index_a
			generate_cycle_data 1,end_index_b,start_index,target,current_data,target_data,unit_data,kpi
		    else
			generate_cycle_data 1,step,start_index,target,current_data,target_data,unit_data,kpi

		    end
		end

	  when KpiFrequency::Yearly
	      for i in start_time.to_i..end_time.to_i
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

    private
    def self.generate_cycle_data start_index,end_index,cycle_index,target,current_data,target_data,unit_data,kpi
	for cycle_value in start_index..end_index
	  cycle=cycle_value>9 ? cycle_value : "0#{cycle_value}" 
			    key="#{cycle_index}-#{cycle_value}"
			    current_data[key]=0
			    target_data[key]=target
			    unit_data[key]=KpiUnit.get_entry_unit_sym kpi.unit
			end
    end

end

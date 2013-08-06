#encoding: utf-8
class Fixnum
    def leap?
	(self%4==0 && self%100!=0) || self%400==0
    end
end

module KpiEntryAnalyseHelper
    def self.get_kpi_entry_analysis_data kpi_id,entity_group_id,start_time,end_time,average
	if kpi=Kpi.find_by_id(kpi_id) and entity_group=EntityGroup.find_by_id(entity_group_id)
	    entity_ids=entity_group.entities.collect{|entity| entity.id}
	    start_time,end_time=DateTimeHelper.get_utc_time_by_str(start_time),DateTimeHelper.get_utc_time_by_str(end_time)
	    target_relation=UserKpiItem.where(:kpi_id=>kpi_id,:entity_id=>entity_ids)
	    target= average ? target_relation.average(:target).to_i : target_relation.sum(:target)
	    current_data={};current_data_count={};target_data={};unit_data={}    
	    params={:current_data=>current_data,:current_data_count=>current_data_count,:target_data=>target_data,:unit_data=>unit_data,:kpi=>kpi,:target=>target}
	    case   kpi.frequency
	    when KpiFrequency::Hourly,KpiFrequency::Daily,KpiFrequency::Weekly
		case kpi.frequency
		when KpiFrequency::Hourly
		    step=60*60
		when KpiFrequency::Daily
		    step=60*60*24
		when KpiFrequency::Weekly
		    start_date=Date.parse(start_time.to_s)+1
		    end_date=Date.parse(end_time.to_s)+1
		    start_time=DateTimeHelper.get_utc_time_by_str(Date.commercial(start_date.year,start_date.cweek,1).to_s)
		    end_time=DateTimeHelper.get_utc_time_by_str(Date.commercial(end_date.year,end_date.cweek,1).to_s)
		    step=60*60*24*7
		end
		  entries=  KpiEntry.where(:kpi_id=>kpi_id,:entity_id=>entity_ids,:parsed_entry_at=> start_time..end_time).all
		while start_time<=end_time do 
		    generate_init_data(start_time,params)
		    start_time+=step
		end 
	    when KpiFrequency::Monthly
	   	start_time=DateTimeHelper.get_utc_time_by_str(Date.new(start_time.year,start_time.month,1).to_s)
	  	end_time=DateTimeHelper.get_utc_time_by_str(Date.new(end_time.year,end_time.month,1).to_s)
		  entries=  KpiEntry.where(:kpi_id=>kpi_id,:entity_id=>entity_ids,:parsed_entry_at=>start_time..end_time).all
		while start_time<=end_time
		    generate_init_data(start_time,params)
		    if start_time.month==2
		  	start_time+=(start_time.year.leap? ? 60*60*24*29 : 60*60*24*28)
		    else
			start_time+=([1,3,5,7,8,10,12].include?(start_time.month+1) ? 60*60*24*31 : 60*60*24*30)
		    end
		end
	    when KpiFrequency::Quarterly
	      start_time,end_time=Time.at(start_time.to_i),Time.at(end_time.to_i)
		start_time=DateTimeHelper.get_utc_time_by_str(Date.new(start_time.year,(start_time.month-1)/3*3+1,1).to_s)
		end_time=DateTimeHelper.get_utc_time_by_str(Date.new(end_time.year,(end_time.month-1)/3*3+1,1).to_s)
		  entries=  KpiEntry.where(:kpi_id=>kpi_id,:entity_id=>entity_ids,:parsed_entry_at=>start_time..end_time).all
		step_arr=[90,91,92,92]
		while start_time<=end_time
		    generate_init_data(start_time,params)
		    if (start_time.month-1)/3==3
			start_time+=((start_time.year+1).leap? ? 60*60*24*(step_arr[0]+1) : 60*60*24*step_arr[0])
		    else
			start_time+=60*60*24*step_arr[(start_time.month-1)/3+1]
		    end
		end
	    when KpiFrequency::Yearly
	       start_time,end_time=Time.at(start_time.to_i),Time.at(end_time.to_i)
		start_time=DateTimeHelper.get_utc_time_by_str(Date.new(start_time.year,1,1).to_s)
		end_time=DateTimeHelper.get_utc_time_by_str(Date.new(end_time.year,1,1).to_s)
		  entries=  KpiEntry.where(:kpi_id=>kpi_id,:entity_id=>entity_ids,:parsed_entry_at=>start_time..end_time).all
		while start_time<=end_time
		    generate_init_data(start_time,params)
		    start_time+=((start_time.year+1).leap? ? 60*60*24*366 : 60*60*24*365)
		end
	    end
	    entries.each do |entry|
		current_data[entry.parsed_entry_at.to_s]+= entry.value
		current_data_count[entry.parsed_entry_at.to_s]+=1
	    end
	    if average
		count=entity_ids.count
		current_data.each do |k,v|
		    current_data[k]=(v/count).round(2)
		end
	    end
	    return {:current=>current_data.values,:target=>target_data.values,:unit=>unit_data.values}
	end
	return nil
    end

    private
    def self.generate_init_data start_time,params
	key=start_time.to_s
	params[:current_data][key]=0
	params[:current_data_count][key]=0
	params[:target_data][key]=params[:target]
	params[:unit_data][key]=KpiUnit.get_entry_unit_sym params[:kpi].unit 
    end
end

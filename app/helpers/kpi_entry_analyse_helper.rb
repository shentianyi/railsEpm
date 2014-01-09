#encoding: utf-8
class Fixnum
  def leap?
    (self%4==0 && self%100!=0) || self%400==0
  end
end

module KpiEntryAnalyseHelper
  def self.get_kpi_entry_analysis_data kpi_id,entity_group_id,start_time,end_time,average,frequency=nil
    if kpi=Kpi.find_by_id(kpi_id) and entity_group=EntityGroup.find_by_id(entity_group_id)
      frequency=kpi.frequency if frequency.nil?
      entity_ids=entity_group.entities.collect{|entity| entity.id}
      start_time,end_time=DateTimeHelper.get_utc_time_by_str(start_time),DateTimeHelper.get_utc_time_by_str(end_time)
      target_relation=UserKpiItem.where(:kpi_id=>kpi_id,:entity_id=>entity_ids)
      target_max= average ? target_relation.average(:target_max).to_i : target_relation.sum(:target_max)
      target_min= average ? target_relation.average(:target_min).to_i : target_relation.sum(:target_min)
      current_data={};current_data_count={};target_max_data={};target_min_data={};unit_data={}; frequency_condition={}
      params={:current_data=>current_data,:current_data_count=>current_data_count,:target_max_data=>target_max_data,:target_min_data=>target_min_data,:unit_data=>unit_data,:kpi=>kpi,:target_max=>target_max,:target_min=>target_min,:fre_condi=>frequency_condition}
      case  kpi.frequency
      when KpiFrequency::Hourly,KpiFrequency::Daily,KpiFrequency::Weekly
        case kpi.frequency
        when KpiFrequency::Weekly
          start_date=Date.parse(start_time.to_s)+1
          end_date=Date.parse(end_time.to_s)+1
          start_time=DateTimeHelper.get_utc_time_by_str(Date.commercial(start_date.year,start_date.cweek,1).to_s)
          end_time=DateTimeHelper.get_utc_time_by_str(Date.commercial(end_date.year,end_date.cweek,1).to_s)
        end
      when KpiFrequency::Monthly
        start_time=DateTimeHelper.get_utc_time_by_str(Date.new(start_time.year,start_time.month,1).to_s)
        end_time=DateTimeHelper.get_utc_time_by_str(Date.new(end_time.year,end_time.month,1).to_s)
      when KpiFrequency::Quarterly
        start_time,end_time=Time.at(start_time.to_i),Time.at(end_time.to_i)
        start_time=DateTimeHelper.get_utc_time_by_str(Date.new(start_time.year,(start_time.month-1)/3*3+1,1).to_s)
        end_time=DateTimeHelper.get_utc_time_by_str(Date.new(end_time.year,(end_time.month-1)/3*3+1,1).to_s)
      when KpiFrequency::Yearly
        start_time,end_time=Time.at(start_time.to_i),Time.at(end_time.to_i)
        start_time=DateTimeHelper.get_utc_time_by_str(Date.new(start_time.year,1,1).to_s)
        end_time=DateTimeHelper.get_utc_time_by_str(Date.new(end_time.year,1,1).to_s)
      end
      entries=  KpiEntry.where(:kpi_id=>kpi_id,:entity_id=>entity_ids,:parsed_entry_at=>start_time..end_time).all
      total=0
      generate_data start_time,end_time,frequency,params
      entries.each do |entry|
        frequency_condition.each do |k,v|
          if entry.parsed_entry_at>=v[0] && entry.parsed_entry_at<v[1]
          current_data[k]+=entry.value
          current_data_count[k]+=1
          total+=entry.value
          end
        end
      end 
      if average
        count=entity_ids.count
        current_data.each do |k,v|
          current_data[k]=(v/count).round(2)
        end
      end
      return{ total:total,datas:{:current=>current_data.values,:target_max=>target_max_data.values,:target_min=>target_min_data.values,:unit=>unit_data.values}}
    end
    return nil
  end

  private

  def self.generate_data start_time,end_time,frequency,params
    case frequency
    when KpiFrequency::Hourly,KpiFrequency::Daily,KpiFrequency::Weekly
      case frequency
      when KpiFrequency::Hourly
        step=60*60
      when KpiFrequency::Daily
        step=60*60*24
      when KpiFrequency::Weekly
        step=60*60*24*7
      end
      
      while start_time<=end_time do
        next_time=start_time+step
        generate_init_data(start_time,next_time,params)
        start_time=next_time
      end
    when KpiFrequency::Monthly
      while start_time<=end_time do  
        if start_time.month==2
        next_time=start_time+(start_time.year.leap? ? 60*60*24*29 : 60*60*24*28)
        else
          next_time=start_time+([1,3,5,7,8,10,12].include?(start_time.month+1) ? 60*60*24*31 : 60*60*24*30)
        end
       generate_init_data(start_time,next_time,params)
        start_time=next_time        
      end
    when KpiFrequency::Quarterly
       step_arr=[90,91,92,92]
      while start_time<=end_time do
        if (start_time.month-1)/3==3
          next_time=start_time+((start_time.year+1).leap? ? 60*60*24*(step_arr[0]+1) : 60*60*24*step_arr[0])
        else
          next_time=start_time+60*60*24*step_arr[(start_time.month-1)/3+1]
        end
        generate_init_data(start_time,next_time,params)
        start_time=next_time
      end
    when KpiFrequency::Yearly
      while start_time<=end_time do
        next_time=start_time+((start_time.year+1).leap? ? 60*60*24*366 : 60*60*24*365)
        generate_init_data(start_time,next_time,params)
        start_time=next_time
      end
    end
  end
  
   def self.generate_init_data start_time,next_time,params
      key=start_time.to_s
      params[:fre_condi][key]=[start_time,next_time]
      params[:current_data][key]=0
      params[:current_data_count][key]=0
      params[:target_max_data][key]=params[:target_max]
      params[:target_min_data][key]=params[:target_min]
      params[:unit_data][key]=KpiUnit.get_entry_unit_sym params[:kpi].unit 
    end
end

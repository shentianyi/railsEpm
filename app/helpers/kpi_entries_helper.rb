#encoding: utf-8
module KpiEntriesHelper
  # create or update kpi entry
  def self.create_update_kpi_entry params
    if kpi_entry=KpiEntry.where(:user_kpi_item_id=>params[:id],:entry_at=>params[:entry_at]).first
      kpi_entry.update_attributes(:original_value=>params[:value])
    else
      kpi_entry=KpiEntry.new(:original_value=>params[:value],:user_kpi_item_id=>params[:id],:entry_at=>params[:entry_at],:kpi_id=>params[:kpi]).save
    end
    return kpi_entry
  end

  # calculate kpi parent value
  def self.calculate_kpi_parent_value kpi_entry_id,kpi_id
    if calcualted_kpis=KpisHelper.get_calculated_kpis_by_base_kpi_id(kpi_id)
        calcualted_kpis.each do |kpi|
	   base_kpi_entries=kpi.base_kpis
	   kpi_entry=KpiEntry.find_by_id(kpi_entry_id)
           f={}
	   

	end	    
    end
  end

  # get kpi entry parsed entry date by frequency
  def self.parse_entry_date frequency,entry_at
    return case frequency
    when KpiFrequency::Hourly
      DateTimeHelper.parse_string_to_date_hour(entry_at)
    when KpiFrequency::Daily
      DateTimeHelper.parse_string_to_date_hour(entry_at)
    when KpiFrequency::Weekly
      DateTimeHelper.parse_week_string_to_date_hour(entry_at)
    when KpiFrequency::Quarterly
      DateTimeHelper.parse_quarter_string_to_date_hour(entry_at)
    when KpiFrequency::Yearly
      DateTimeHelper.parse_year_string_to_date_hour(entry_at)
    end
  end

end

#encoding: utf-8
module KpiEntriesHelper
    
    # create or update kpi entry
    def self.create_update_kpi_entry params
	if kpi_entry=KpiEntry.where(:user_kpi_item_id=>params[:id],:entry_at=>params[:entry_at])	  
	    kpi_entry.update_attributes(:original_value=>params[:value])
	else
	    kpi_entry=KpiEntry.new(:original_value=>params[:value],:user_kpi_item_id=>params[:id],:entry_at=>param[:entry_at]).save
	end
	return kpi_entry
    end

    # get kpi entry parsed entry date by frequency
    def self.get_parsed_entry_date frequency,entry_at
      return case frequency
      when KpiFrequency::Hourly
        entry_at
      when KpiFrequency::Daily
	  
      end
    end
end

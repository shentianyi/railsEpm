#encoding: utf-8
module KpiEntriesHelper
  # create or update kpi entry
  def self.create_update_kpi_entry params, current_ability=nil
    if   kpi= (current_ability.nil? ? Kpi.find_by_id(params[:kpi_id]) : Kpi.accessible_by(current_ability).find_by_id(params[:kpi_id]))
      parsed_entry_at=DateTimeHelper.get_utc_time_by_str(params[:entry_at])
      if user_kpi_item=UserKpiItem.find_by_id(params[:user_kpi_item_id])
        if kpi_entry=KpiEntry.where(user_kpi_item_id: user_kpi_item.id, parsed_entry_at: parsed_entry_at, entity_id: user_kpi_item.entity_id).first
          kpi_entry.update_attributes(:original_value => params[:value])
        else
          kpi_entry=KpiEntry.new(original_value: params[:value], user_kpi_item_id: user_kpi_item.id, parsed_entry_at: parsed_entry_at, entity_id: user_kpi_item.entity_id, user_id: user_kpi_item.user_id,
                                 target_max: user_kpi_item.target_max, target_min: user_kpi_item.target_min)
          kpi_entry.kpi=kpi
          kpi_entry.save
        end
        return kpi_entry
      end
    end unless params[:value].blank?
  end

  # calculate kpi parent value
  def self.calculate_kpi_parent_value kpi_entry_id=nil, entry=nil
    if entry=(kpi_entry_id.nil? ? entry : KpiEntry.where(:id => kpi_entry_id).first)
      if calcualted_kpis=Kpi.parent_kpis_by_id(entry.kpi_id)
        calcualted_kpis.each do |kpi|
          kpi_entry_at=reparse_entry_date(kpi.frequency, entry.parsed_entry_at)
          kpi_parsed_entry_at=parse_entry_date(kpi.frequency, kpi_entry_at)
          if kpi_parsed_entry_at==entry.parsed_entry_at
            f={}
            kpi.base_kpis.each do |base_bkpi|
              sym=base_bkpi.id.to_s.to_sym; f[sym]=nil
              if base_entry=get_kpi_entry_for_calculate(entry.user_id, entry.entity_id, base_bkpi.id, entry.parsed_entry_at)
                f[sym]=base_entry.value
              else
                f[sym]=0
              end
            end
            KpisHelper.parse_formula_items(kpi.formula).each do |item|
              kpi.formula.sub!("[#{item}]", f[item.to_sym].to_s)
            end
            value=kpi.formula.calculate
            if calcualted_entry=get_kpi_entry_for_calculate(entry.user_id, entry.entity_id, kpi.id, kpi_parsed_entry_at)
              calcualted_entry.update_attributes(:original_value => value)
            else
              if user_kpi_item= kpi.user_kpi_items.where(:entity_id => entry.entity_id, :user_id => entry.user_id).first
                KpiEntry.new(:original_value => value, :user_kpi_item_id => user_kpi_item.id, :kpi_id => kpi.id, :entry_at => kpi_entry_at, :parsed_entry_at => kpi_parsed_entry_at,
                             :user_id => user_kpi_item.user_id, :entity_id => user_kpi_item.entity_id, :target_max => user_kpi_item.target_max, :target_min => user_kpi_item.target_min).save
              else
                # puts '------------'
                # puts kpi.to_json
                # puts entry.to_json
                # puts '*************8'
              end
            end
          end
        end
      end
    end
  end

  def self.init_cal_type_kpi_entry kpi_id
    if kpi=Kpi.find_by_id(kpi_id)
      kpi.base_kpis.each do |base_kpi|
        count= base_kpi.kpi_entries.count
        if count>0
          steps= count/1000 +count%2
          end_index=base_kpi.kpi_entries.order('kpi_entries.id desc').first.id
          for i in 0..steps
            base_kpi.kpi_entries.offset(i*1000).limit(1000).where('kpi_entries.id<=?', end_index).each do |entry|
              calculate_kpi_parent_value(nil, entry)
            end
          end
        end
      end
    end
  end

  # get base kpi entry for calculate
  def self.get_kpi_entry_for_calculate user_id, entity_id, kpi_id, parsed_entry_at
    KpiEntry.joins(:user_kpi_item => :kpi).where('user_kpi_items.user_id=? and user_kpi_items.entity_id=? and kpi_entries.kpi_id=? and kpi_entries.parsed_entry_at=?', user_id, entity_id, kpi_id, parsed_entry_at).readonly(false).first
  end

  # get kpi entry by user kpi item id, frequency and datetime
  def self.get_kpi_entry_for_entry kpi_item_id, parsed_entry_at
    if item=UserKpiItem.find_by_id(kpi_item_id)
      return KpiEntry.where(:user_kpi_item_id => kpi_item_id, :parsed_entry_at => parsed_entry_at, :entity_id => item.entity_id).first
    end
    nil
  end

  # get kpi entry parsed entry date by frequency
  def self.parse_entry_date frequency, entry_at
    return case frequency
             when KpiFrequency::Hourly
               DateTimeHelper.parse_string_to_date_hour(entry_at)
             when KpiFrequency::Daily
               DateTimeHelper.parse_string_to_date_hour(entry_at)
             when KpiFrequency::Weekly
               DateTimeHelper.parse_week_string_to_date_hour(entry_at)
             when KpiFrequency::Monthly
               DateTimeHelper.parse_month_string_to_date_hour(entry_at)
             when KpiFrequency::Quarterly
               DateTimeHelper.parse_quarter_string_to_date_hour(entry_at)
             when KpiFrequency::Yearly
               DateTimeHelper.parse_year_string_to_date_hour(entry_at)
           end
  end

  # get kpi entry entry date by frequency
  def self.reparse_entry_date frequency, parsed_entry_at
    return case frequency
             when KpiFrequency::Hourly
               DateTimeHelper.parse_time_to_hour_string(parsed_entry_at)
             when KpiFrequency::Daily
               DateTimeHelper.parse_time_to_day_string(parsed_entry_at)
             when KpiFrequency::Weekly
               DateTimeHelper.parse_time_to_week_string(parsed_entry_at)
             when KpiFrequency::Monthly
               DateTimeHelper.parse_time_to_month_string(parsed_entry_at)
             when KpiFrequency::Quarterly
               DateTimeHelper.parse_time_to_quarter_string(parsed_entry_at)
             when KpiFrequency::Yearly
               DateTimeHelper.parse_time_to_year_stirng(parsed_entry_at)
           end
  end

  def self.parse_entry_string_date frequency,date
    return case frequency
                     when KpiFrequency::Hourly
                       DateTimeHelper.parse_string_to_date_hour(self.date)
                     when KpiFrequency::Daily
                       Time.strptime(date, '%Y-%m-%d')
                     when KpiFrequency::Weekly
                       date=Date.parse(date)
                       Date.commercial(date.year, date.cweek, 1)
                     when KpiFrequency::Monthly
                       Time.strptime(date, '%Y-%m-01')
                     when KpiFrequency::Quarterly
                       month=Date.parse(date).month
                       Time.strptime(date, "%Y-#{date.month-month%3}-01")
                     when KpiFrequency::Yearly
                       Time.strptime(date, '%Y-01-01')
                   end
  end
end

#encoding: utf-8
module KpiEntriesHelper
  # create or update kpi entry
  def self.create_update_kpi_entry params, current_ability=nil
    #validator = KpiEntryValidator.new(params)
    #validator.validate
    #if validator.valid
    #  validator.entry
    #end



    if   kpi= (current_ability.nil? ? Kpi.find_by_id(params[:kpi_id]) : Kpi.accessible_by(current_ability).find_by_id(params[:kpi_id]))
      parsed_entry_at=EntryDateTimeHelper.get_utc_time_from_str(params[:entry_at])
      if user_kpi_item=UserKpiItem.find_by_id(params[:user_kpi_item_id])
        validator = KpiEntryValidator.new(params)
        validator.validate
        if validator.valid
          kpi_entry = validator.entry
          return kpi_entry
        end
=begin
        attrs = {}
        attrs[:base_attrs] = {}
        attrs[:base_attrs]["original_value"] = params[:value]
        attrs[:base_attrs]["kpi_id"] = kpi.id
        attrs[:base_attrs]["frequency"] = kpi.frequency
        attrs[:base_attrs]["user_kpi_item_id"] = user_kpi_item.id
        attrs[:base_attrs]["user_id"] = user_kpi_item.user_id
        attrs[:base_attrs]["entity_id"] = user_kpi_item.entity_id
        attrs[:base_attrs]["target_max"] = user_kpi_item.target_max
        attrs[:base_attrs]["target_min"] = user_kpi_item.target_min
        attrs[:base_attrs]["entry_at"] = params[:entry_at]
        attrs[:base_attrs]["parsed_entry_at"] = parsed_entry_at
        attrs[:base_attrs]["entry_type"] = params.has_key?(:entry_type) ? params[:entry_type] : 1
        attrs[:kpi_properties] = params.has_key?("kpi_properties") ? params["kpi_properties"] : nil
        kpi_entry = Entry::OperateService.new.insert_entry(attrs)
=end
=begin
        if kpi_entry=KpiEntry.where(user_kpi_item_id: user_kpi_item.id, parsed_entry_at: parsed_entry_at, entity_id: user_kpi_item.entity_id).first
          kpi_entry.update_attributes(:original_value => params[:value])
        else
          entrytype = params.has_key?("entry_type") ? params[:entry_type] : 1
          kpi_entry=KpiEntry.new(original_value: params[:value], user_kpi_item_id: user_kpi_item.id, parsed_entry_at: parsed_entry_at,entry_at:params[:entry_at], entity_id: user_kpi_item.entity_id, user_id: user_kpi_item.user_id,
                                 target_max: user_kpi_item.target_max, target_min: user_kpi_item.target_min, entry_type:entrytype)
          kpi_entry.kpi_id=kpi.id
          kpi_entry.save
        end
=end
        #return kpi_entry
      end
    end unless params[:value].blank?

  end

  # calculate kpi parent value
  def self.calculate_kpi_parent_value kpi_entry_id=nil, entry=nil
    if entry=(kpi_entry_id.nil? ? entry : KpiEntry.where(:id => kpi_entry_id).first)
      if calcualted_kpis=Kpi.parent_kpis_by_id(entry.kpi_id)
        calcualted_kpis.each do |kpi|
          #kpi_entry_at=reparse_entry_date(kpi.frequency, entry.parsed_entry_at)
          #kpi_entry_at = Time.parse(kpi_entry_at).utc
          #kpi_parsed_entry_at=parse_entry_date(kpi.frequency, kpi_entry_at)
          #take entry's entry_at as the calculated kpi's entry
          kpi_entry_at = entry.entry_at
          kpi_parsed_entry_at = parse_entry_string_date(kpi.frequency,kpi_entry_at)
          kpi_parsed_entry_at = EntryDateTimeHelper.get_utc_time_from_str(kpi_parsed_entry_at)
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
            #2014-4-20
            # change this to use OperateService
            #
            user_kpi_item = kpi.user_kpi_items.where(:entity_id => entry.entity_id, :user_id => entry.user_id).first
            if user_kpi_item
              attrs = {}
              attrs[:base_attrs]={}
              attrs[:base_attrs]['original_value'] = value.to_f
              attrs[:base_attrs]['kpi_id'] = kpi.id
              attrs[:base_attrs]['frequency'] = kpi.frequency
              attrs[:base_attrs]['user_kpi_item_id'] = user_kpi_item.id
              attrs[:base_attrs]['user_id'] = entry.user_id
              attrs[:base_attrs]['entity_id'] = entry.entity_id
              attrs[:base_attrs]['target_max'] = kpi.target_max
              attrs[:base_attrs]['target_min'] = kpi.target_min
              attrs[:base_attrs]['entry_at'] = kpi_entry_at
              attrs[:base_attrs]['parsed_entry_at'] = kpi_parsed_entry_at
              attrs[:base_attrs]['entry_type'] = 0
              attrs[:kpi_properties] = nil
              Entry::OperateService.new.insert_entry(attrs)
            end

=begin
            if calcualted_entry=get_kpi_entry_for_calculate(entry.user_id, entry.entity_id, kpi.id, kpi_parsed_entry_at)
              calcualted_entry.update_attributes(:original_value => value)
            else
              if user_kpi_item= kpi.user_kpi_items.where(:entity_id => entry.entity_id, :user_id => entry.user_id).first
                KpiEntry.new(:original_value => value, :user_kpi_item_id => user_kpi_item.id, :kpi_id => kpi.id, :entry_at => kpi_entry_at, :parsed_entry_at => kpi_parsed_entry_at,
                             :user_id => user_kpi_item.user_id, :entity_id => user_kpi_item.entity_id, :target_max => user_kpi_item.target_max, :target_min => user_kpi_item.target_min,:entry_type => 1).save
              else
                # puts '------------'
                # puts kpi.to_json
                # puts entry.to_json
                # puts '*************8'
              end
            end
=end
          end
        end
      end
    end
  end

  def self.calculate_caled_kpi kpi_id,entry
    #puts "--START CALCULATE--".red
    #KpiCalculateQueue.process(kpi_id,entry["parsed_entry_at"].to_milli)
    KpiCalculateQueue.process(kpi_id,entry["user_id"],Time.parse(entry["parsed_entry_at"]).to_milli)
    kpi = Kpi.includes(:user_kpi_items).find_by_id(kpi_id)

    kpi_entry_at = Time.parse(entry["entry_at"])
    kpi_parsed_entry_at = parse_entry_string_date(kpi.frequency,kpi_entry_at)
    kpi_parsed_entry_at = EntryDateTimeHelper.get_utc_time_from_str(kpi_parsed_entry_at)

    #puts kpi_parsed_entry_at
    #puts entry["parsed_entry_at"]

    if kpi_parsed_entry_at==Time.parse(entry["parsed_entry_at"])
      f={}
      kpi.base_kpis.each do |base_bkpi|
        sym=base_bkpi.id.to_s.to_sym; f[sym]=nil
        if base_entry=get_kpi_entry_for_calculate(entry["user_id"], entry["entity_id"], base_bkpi.id, entry["parsed_entry_at"])
          f[sym]=base_entry.value
        else
          f[sym]=0
        end
      end
      KpisHelper.parse_formula_items(kpi.formula).each do |item|
        kpi.formula.sub!("[#{item}]", f[item.to_sym].to_s)
      end
      value=kpi.formula.calculate
      puts "VALUE:"+value.to_s
      #2014-4-20
      # change this to use OperateService
      #
      user_kpi_item = kpi.user_kpi_items.where(:entity_id => entry["entity_id"], :user_id => entry["user_id"]).first
      if user_kpi_item
        attrs = {}
        attrs[:base_attrs]={}
        attrs[:base_attrs]['original_value'] = value.to_f
        attrs[:base_attrs]['kpi_id'] = kpi.id
        attrs[:base_attrs]['frequency'] = kpi.frequency
        attrs[:base_attrs]['user_kpi_item_id'] = user_kpi_item.id
        attrs[:base_attrs]['user_id'] = entry["user_id"]
        attrs[:base_attrs]['entity_id'] = entry["entity_id"]
        attrs[:base_attrs]['target_max'] = kpi.target_max
        attrs[:base_attrs]['target_min'] = kpi.target_min
        attrs[:base_attrs]['entry_at'] = kpi_entry_at
        attrs[:base_attrs]['parsed_entry_at'] = kpi_parsed_entry_at
        attrs[:base_attrs]['entry_type'] = 0
        attrs[:kpi_properties] = nil
        Entry::OperateService.new.insert_entry(attrs)
      end
    end
    #puts "--END CALCULATE--".red
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
    parsed_entry_at = Time.parse(parsed_entry_at.to_s).utc
    #KpiEntry.joins(:user_kpi_item => :kpi).where('user_kpi_items.user_id=? and user_kpi_items.entity_id=? and kpi_entries.kpi_id=? and kpi_entries.parsed_entry_at=?', user_id, entity_id, kpi_id, parsed_entry_at).readonly(false).first
    item = UserKpiItem.where(entity_id:entity_id,user_id:user_id,kpi_id:kpi_id).first
    if item
      KpiEntry.where(user_kpi_item_id: item.id, parsed_entry_at: parsed_entry_at, entity_id: entity_id,entry_type: 1).first
    else
      nil
    end
  end

  # get kpi entry by user kpi item id, frequency and datetime
  def self. get_kpi_entry_for_entry kpi_item_id, parsed_entry_at
    if item=UserKpiItem.find_by_id(kpi_item_id)
      entry = KpiEntry.where(:user_kpi_item_id => kpi_item_id, :parsed_entry_at => parsed_entry_at, :entity_id => item.entity_id,:entry_type => 1).first
      return entry
    end
    nil
  end

  # get kpi entry parsed entry date by frequency
  def self.parse_entry_date frequency, entry_at
    return case frequency
             when KpiFrequency::Hourly
               #DateTimeHelper.parse_string_to_date_hour(entry_at)
               EntryDateTimeHelper.db_hour_date(entry_at)
             when KpiFrequency::Daily
               #DateTimeHelper.parse_string_to_date_hour(entry_at)
               EntryDateTimeHelper.db_day_date(entry_at)
             when KpiFrequency::Weekly
               #DateTimeHelper.parse_week_string_to_date_hour(entry_at)
               EntryDateTimeHelper.db_week_day_date(entry_at)
             when KpiFrequency::Monthly
               #DateTimeHelper.parse_month_string_to_date_hour(entry_at)
               EntryDateTimeHelper.db_month_day_date(entry_at)
             when KpiFrequency::Quarterly
               #DateTimeHelper.parse_quarter_string_to_date_hour(entry_at)
               EntryDateTimeHelper.db_quarter_day_date(entry_at)
             when KpiFrequency::Yearly
               #DateTimeHelper.parse_year_string_to_date_hour(entry_at)
               EntryDateTimeHelper.db_year_day_date(entry_at)
           end
  end

  # get kpi entry entry date by frequency
  def self.reparse_entry_date frequency, parsed_entry_at
    return case frequency
             when KpiFrequency::Hourly
               DateTimeHelper.parse_time_to_hour_string(parsed_entry_at)
               #EntryDateTimeHelper.view_hour_str(parsed_entry_at)
             when KpiFrequency::Daily
               #DateTimeHelper.parse_time_to_day_string(parsed_entry_at)
               EntryDateTimeHelper.view_day_str(parsed_entry_at)
             when KpiFrequency::Weekly
               DateTimeHelper.parse_time_to_week_string(parsed_entry_at)
               #EntryDateTimeHelper.view_week_str(parsed_entry_at)
             when KpiFrequency::Monthly
               DateTimeHelper.parse_time_to_month_string(parsed_entry_at)
               #EntryDateTimeHelper.view_month_str(parsed_entry_at)
             when KpiFrequency::Quarterly
               DateTimeHelper.parse_time_to_quarter_string(parsed_entry_at)
               #EntryDateTimeHelper.view_quarter_str(parsed_entry_at)
             when KpiFrequency::Yearly
               DateTimeHelper.parse_time_to_year_stirng(parsed_entry_at)
               #EntryDateTimeHelper.view_year_str(parsed_entry_at)
           end
  end

  #@function parse_entry_string_date
  #parse string to a specific date string dependent on the frequency
  #we accept date as utc time
  def self.parse_entry_string_date frequency,date
    return case frequency
             when KpiFrequency::Hourly
               #convert 2014-04-15 12:23:49 to 2014-04-15 12:00:00 UTC
               #DateTimeHelper.parse_string_to_date_hour(self.date)
               EntryDateTimeHelper.db_hour_date(date)
             when KpiFrequency::Daily
               #Time.strptime(date, '%Y-%m-%d').to_datetime
               #Time.parse(date).strftime('%Y-%m-%d')
               EntryDateTimeHelper.db_day_date(date)
             when KpiFrequency::Weekly
               #date=Date.parse(date)
               #Date.commercial(date.year, date.cweek, 1)
               EntryDateTimeHelper.db_week_day_date(date)
             when KpiFrequency::Monthly
               #Time.strptime(date, '%Y-%m-01').to_datetime
               EntryDateTimeHelper.db_month_day_date(date)
             when KpiFrequency::Quarterly
               #month=Date.parse(date).month
               #Time.strptime(date, "%Y-#{date.month-month%3}-01").to_datetime
               EntryDateTimeHelper.db_quarter_day_date(date)
             when KpiFrequency::Yearly
               #Time.strptime(date, '%Y-01-01').to_datetime
               EntryDateTimeHelper.db_year_day_date(date)
           end
  end
end

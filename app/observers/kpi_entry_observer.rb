#encoding: utf-8
class KpiEntryObserver<Mongoid::Observer
  observe :kpi_entry

  def after_save kpi_entry
    if kpi_entry.entry_type == 1
      kpi = Kpi.find_by_id(kpi_entry.kpi_id)
      #if kpi
      Resque.enqueue(KpiEntryCalculator, kpi_entry.id) unless kpi.is_calculated
      #end
      #KpiEntriesHelper.calculate_kpi_parent_value kpi_entry.id unless kpi.is_calculated
      return
    end
  end

  def after_create kpi_entry
    if kpi_entry.entry_type == 1
      return
    end
    #do collect
    #check if collect exits?
    #
    #collect_entry = KpiEntry.find_by(kpi_id:kpi_entry.kpi_id,parsed_entry_at:kpi_entry.parsed_entry_at,entrytype:"1")
    collect_entry = KpiEntry.where(user_kpi_item_id: kpi_entry.user_kpi_item_id, parsed_entry_at: kpi_entry.parsed_entry_at, entity_id: kpi_entry.entity_id,entry_type: 1).first
    if collect_entry
      #recalculate all kpi entrys
      total = 0
      KpiEntry.where(user_kpi_item_id: kpi_entry.user_kpi_item_id, parsed_entry_at: kpi_entry.parsed_entry_at, entity_id: kpi_entry.entity_id,entry_type: 0).each{|entry|
        total = total + entry.original_value
      }
      #val = collect_entry.original_value
      collect_entry.update_attribute("original_value",total)
    else
      #if not find,create one
      new_collect_entry = {}
      new_collect_entry[:base_attrs] = {}
      new_collect_entry[:base_attrs]["kpi_id"] = kpi_entry.kpi_id
      new_collect_entry[:base_attrs]["user_id"] = kpi_entry.user_id
      new_collect_entry[:base_attrs]["entity_id"] = kpi_entry.entity_id
      #new_collect_entry[:base_attrs]["tenant_id"] = kpi_entry.tenant_id
      new_collect_entry[:base_attrs]["user_kpi_item_id"] = kpi_entry.user_kpi_item_id
      new_collect_entry[:base_attrs]["target_max"] = kpi_entry.target_max
      new_collect_entry[:base_attrs]["target_min"] = kpi_entry.target_min
      new_collect_entry[:base_attrs]["original_value"] =  kpi_entry.value
      new_collect_entry[:base_attrs]["entry_at"] = kpi_entry.entry_at
      new_collect_entry[:base_attrs]["parsed_entry_at"] = kpi_entry.parsed_entry_at
      new_collect_entry[:base_attrs]["frequency"] = kpi_entry.frequency
      new_collect_entry[:base_attrs]["entry_type"] = 1
      Entry::OperateService.new.insert_entry(new_collect_entry)
=begin
      new_collect = KpiEntry.new
      new_collect.kpi_id = kpi_entry.kpi_id
      new_collect.user_id = kpi_entry.user_id
      new_collect.entity_id = kpi_entry.entity_id
      new_collect.tenant_id = kpi_entry.tenant_id
      new_collect.user_kpi_item_id = kpi_entry.user_kpi_item_id
      new_collect.target_max = kpi_entry.target_max
      new_collect.target_min = kpi_entry.target_min
      new_collect.value = kpi_entry.value
      new_collect.entry_at = kpi_entry.entry_at
      new_collect.parsed_entry_at = kpi_entry.parsed_entry_at
      new_collect.frequency = kpi_entry.frequency
      new_collect.entry_type = 1
  		new_collect.save!
=end
    end

    #add property val
    kpi = Kpi.find_by_id(kpi_entry.kpi_id)
    kpi_entry.dynamic_attributes.each{|attr_id|
      item = kpi.kpi_property_items.where("kpi_property_id = ?",attr_id.tr("a","")).first if kpi
      KpiPropertyValue.add_property_value(item.id,kpi_entry[attr_id]) if item
    }
  end

  def after_destroy kpi_entry
    if kpi_entry.entry_type == 1
      return
    end
    #
    collect_entry = KpiEntry.where(user_kpi_item_id: kpi_entry.user_kpi_item_id, parsed_entry_at: kpi_entry.parsed_entry_at, entity_id: kpi_entry.entity_id,entry_type: 1).first
    if collect_entry
      total = 0
      KpiEntry.where(user_kpi_item_id: kpi_entry.user_kpi_item_id, parsed_entry_at: kpi_entry.parsed_entry_at, entity_id: kpi_entry.entity_id,entry_type: 0).each{|entry|
        total = total + entry.original_value
      }
      #val = kpi_entry.original_value
      #old_val = collect_entry.original_value
      collect_entry.update_attribute("original_value",total)
    end

    #desc property val
    kpi = Kpi.find_by_id(kpi_entry.kpi_id)
    unless kpi.nil?
      kpi_entry.dynamic_attributes.each{|attr_id|
        item = kpi.kpi_property_items.where("kpi_property_id = ?",attr_id.tr("a","")).first
        KpiPropertyValue.desc_property_value(item.id,kpi_entry[attr_id]) if item
      }

    end


    #destroy collection kpi entry if no details left
    if kpi_entry.last_detail?
      collect_entry.destroy if collect_entry
    end
  end

  def after_update kpi_entry
    if kpi_entry.entry_type == 1
      return
    end

    collect_entry = KpiEntry.where(user_kpi_item_id: kpi_entry.user_kpi_item_id, parsed_entry_at: kpi_entry.parsed_entry_at, entity_id: kpi_entry.entity_id,entry_type: 1).first

    if collect_entry #&& kpi_entry.original_value_changed?
      #val_change = kpi_entry.original_value-BigDecimal.new(kpi_entry.original_value_was)
      #val = collect_entry.original_value+val_change
      total = 0
      KpiEntry.where(user_kpi_item_id: kpi_entry.user_kpi_item_id, parsed_entry_at: kpi_entry.parsed_entry_at, entity_id: kpi_entry.entity_id,entry_type: 0).each{|entry|
        total = total + entry.original_value
      }
      collect_entry.update_attribute("original_value",total)
    end

    kpi = Kpi.find_by_id(kpi_entry.kpi_id)
    (kpi_entry.changed&kpi_entry.dynamic_attributes).each { |attr_id|
      item = kpi.kpi_property_items.where("kpi_property_id = ?",attr_id.tr("a","")).first
      if item
        KpiPropertyValue.desc_property_value(item.id, kpi_entry.changes[attr_id][0])
        KpiPropertyValue.add_property_value(item.id, kpi_entry.changes[attr_id][1])
      end
    }


  end

  def before_save kpi_entry
    #if kpi_entry.entry_type == 0
    #  return
    #end

    kpi = Kpi.find_by_id(kpi_entry.kpi_id)
    if kpi.nil?
      puts ("kpi_with_id: "+kpi_entry.kpi_id.to_s+" not found").red
      if kpi_entry.new_record?
        #if we counld not find the kpi ,this entry should not be inserted.
        return false
      else
        return
      end
    end

    kpi_entry.kpi_id = kpi.id
    if kpi_entry.new_record?
      kpi_entry.frequency = kpi.frequency
    end
    if kpi_entry.original_value.is_a? String
      kpi_entry.original_value = kpi_entry.original_value.to_f
    end

    if kpi_entry.original_value && kpi_entry.original_value.finite?
      kpi_entry.value = KpiUnit.parse_entry_value(kpi.unit,kpi_entry.original_value)
      kpi_entry.abnormal = false
    else
      kpi_entry.value = kpi_entry.original_value = 0
      kpi_entry.abnormal = true
    end
  end
  # calculate parent kpi entry value
  #def after_save kpi_entry
  #  Resque.enqueue(KpiEntryCalculator, kpi_entry.id) unless kpi_entry.kpi.is_calculated
  #end
end

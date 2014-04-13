#encoding: utf-8
class KpiEntryObserver<Mongoid::Observer
  observe :kpi_entry

  def after_save kpi_entry
  	if kpi_entry.entry_type == 1
  		return
  	end
  	#do collect
  	#check if collect exits?
  	puts kpi_entry.value
  	collect_entry = KpiEntry.where({parsed_entry_at:kpi_entry.parsed_entry_at,entry_type:"1",kpi_id:kpi_entry.kpi_id})
  	if collect_entry
  		val = collect_entry.value
  		collect_entry.update_attribute("value",val+kpi_entry.value)
  	else
  		#if not find,create one
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
  	end
  end

  def after_destroy kpi_entry
  	if kpi_entry.entry_type == 1
  		return
  	end
  	collect_entry = KpiEntry.where({parsed_entry_at:kpi_entry.parsed_entry_at,entry_type:"1",kpi_id:kpi_entry.kpi_id})
  	#
  	if kpi_entry.value.is_changed? && collect_entry
  		val = kpi_entry.value - kpi_entry.value.old
  		old_val = collect_entry.value
  		collect_entry.update_attribute("value",old_val+val)
  	end
  end

  def after_update kpi_entry
  	if kpi_entry.entry_type == 1
  		return
  	end

  	collect_entry = KpiEntry.where({parsed_entry_at:kpi_entry.parsed_entry_at,entry_type:"1",kpi_id:kpi_entry.kpi_id})
  	if collect_entry
  		val = kpi_entry.value
  		old_val = collect_entry.value
  		collect_entry.update_attribute("value",old_val - val)
  	end
  end

  def before_save kpi_entry
    kpi = Kpi.find_by_id(kpi_entry.kpi_id)
    kpi_entry.kpi_id = kpi.id
    if kpi_entry.new_record?
      kpi_entry.frequency = kpi.frequency
    end
    if kpi_entry.original_value.finite?
      kpi_entry.value = KpiUnit.parse_entry_value(kpi.unit,kpi_entry.original_value)
      kpi_entry.abnormal = false
    else
      kpi_entry.value = kpi_entry.original_value = 0
      kpi_entry.abnormal = true
    end
    true
  end
end

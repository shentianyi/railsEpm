#encoding: utf-8
class KpiEntryObserver<Mongoid::Observer
  observe :kpi_entry

  def after_save kpi_entry
    # Kpi.find_by_id(kpi_entry.kpi_id).kpi_subscribes.each do |ks|
    #   ks.execute kpi_entry
    # end
  end

  def after_create kpi_entry
    if kpi_entry.entry_type == 1
      return
    end

    #add property val
    kpi = Kpi.find_by_id(kpi_entry.kpi_id)

    # kpi.kpi_property_items.where(kpi_property_id: kpi_entry.dynamic_attributes.collect { |attr_id| attr_id.sub(/a/, '') }).all.each do |item|
    #   KpiPropertyValue.add_property_value(item.id, item.kpi_property_id) if item
    # end if kpi

    kpi_entry.dynamic_attributes.each { |attr_id|
      item = kpi.kpi_property_items.where("kpi_property_id = ?", attr_id.tr("a", "")).first if kpi
      KpiPropertyValue.add_property_value(item.id, kpi_entry[attr_id]) if item
    }
  end

  def after_update kpi_entry
    kpi = Kpi.find_by_id(kpi_entry.kpi_id)
    (kpi_entry.changed&kpi_entry.dynamic_attributes).each { |attr_id|
      item = kpi.kpi_property_items.where("kpi_property_id = ?", attr_id.tr("a", "")).first
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
      kpi_entry.value = KpiUnit.parse_entry_value(kpi.unit, kpi_entry.original_value)
      kpi_entry.abnormal = false
    else
      kpi_entry.value = kpi_entry.original_value = 0
      kpi_entry.abnormal = true
    end
  end
end

#ActiveRecord::Base.observers.disable :kpi_entry_observer
#KpiEntry.observers.disable :all

KpiEntryBak.all.each do |e|
  if kpi = Kpi.find_by_id(e.kpi_id)
    unless kpi.is_calculated
      entry_at = e.entry_at.nil? ? e.parsed_entry_at : e.entry_at
      me=KpiEntry.create(
          kpi_id: e.kpi_id,
          user_id: e.user_id,
          entity_id: e.entity_id,
          user_kpi_item_id: e.user_kpi_item_id,
          entry_at: entry_at,
          parsed_entry_at: e.parsed_entry_at,
          original_value: e.original_value.to_f,
          value: e.value.to_f,
          target_max: e.target_max,
          target_min: e.target_min,
          frequency: e.frequency,
          entry_type: 0,
          abnormal: e.abnormal,
          created_at: e.created_at,
          updated_at: e.updated_at
      )
      puts me.to_json
    end
  end
end


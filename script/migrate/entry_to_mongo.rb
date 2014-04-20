#ActiveRecord::Base.observers.disable :kpi_entry_observer
KpiEntry.observers.disable :all

KpiEntryBak.all.each do |e|
  r=Random.new
  0.upto(10).each do |i|
    me=KpiEntry.create(
        kpi_id: e.kpi_id,
        user_id: e.user_id,
        entity_id: e.entity_id,
        user_kpi_item_id: e.user_kpi_item_id,
        entry_at: e.entry_at,
        parsed_entry_at: e.parsed_entry_at-i.years,
        original_value: e.original_value,
        value: e.value+r.rand(0..100),
        target_max: e.target_max,
        target_min: e.target_min,
        frequency: e.frequency,
        entry_type: 0,
        abnormal: e.abnormal,
        created_at: e.created_at,
        updated_at: e.updated_at,
        'a1' => e.entity_id.to_s
    )
    puts me.to_json
  end
end
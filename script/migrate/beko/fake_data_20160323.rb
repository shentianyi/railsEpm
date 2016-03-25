kpi=Kpi.first
sensors=[]

#1
for i in 1..26
  sensors<< (i>9 ? "ET-C#{i}" : "ET-C0#{i}")
end

#2
for i in 1..84
  sensors<< (i>9 ? "ES-C#{i}" : "ES-C0#{i}")
end
time=Time.parse('2016-3-23 9:00')
max=21
min=5
sensors.each do |s|
  entity=Entity.find_by_code(s)

  20.times do
    v=rand(5...26)

    KpiEntry.create(
        entry_type: 0,
        kpi_id: kpi.id,
        entry_at: time.utc,
        entity_id: entity.id,
        original_value: v,
        value: v,
        abnormal: false,
        target_max: 21,
        target_min: 5,
        frequency: kpi.frequency,
        exception: v>max || v<min,
        a1: (v>max || v<min) ? 'YES' : 'NO',
        fake: true
    )
  end
end

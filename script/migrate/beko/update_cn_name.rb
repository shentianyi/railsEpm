KpiCategory.where(name: '效率').update_all(
    name: 'Efficiency',
    description: 'Efficiency'
)

Kpi.where(name: '工作时间').update_all(
    name: 'WorkingTime',
    description: 'WorkingTime',
    target_max: 22,
    target_min: 5
)

UserKpiItem.update_all(target_max:22,target_min:5)


EntityGroupItem.delete_all

kv={'Beko' => 'Beko',
    '滚筒内装配线' => 'Drum Assembly Line',
    '滚筒箱体线' => 'Cabinet Assembly Line',
    '滚筒总装线' => 'Main Assembly Line', '滚筒包装线' => 'Packaging Line'}

sensors={
    'Beko' => [],
    'Drum Assembly Line' => [],
    'Cabinet Assembly Line' => [],
    'Main Assembly Line' => [],
    'Packaging Line' => []
}

#1
for i in 1..11
  sensors['Drum Assembly Line']<< (i>9 ? "1N-C#{i}" : "1N-C0#{i}")
end

sensors['Beko']+= sensors['Drum Assembly Line']
#2
for i in 1..10
  sensors['Cabinet Assembly Line']<< (i>9 ? "3U-C#{i}" : "3U-C0#{i}")
end

sensors['Beko']+= sensors['Cabinet Assembly Line']

#3
for i in 11..35
  sensors['Main Assembly Line']<< (i>9 ? "3U-C#{i}" : "3U-C0#{i}")
end
sensors['Beko']+= sensors['Main Assembly Line']

#4
for i in 36..45
  sensors['Packaging Line']<< (i>9 ? "3U-C#{i}" : "3U-C0#{i}")
end
sensors['Beko']+= sensors['Packaging Line']

p sensors

kv.each do |k, v|
  if d=Department.find_by_name(k)
    d.update_attributes(name: v)
  end

  if eg=(EntityGroup.find_by_name(k)||EntityGroup.find_by_name(v))
    eg.update_attributes({name: v, code: v})

    sensors[v].each do |vv|

      if ee=Entity.find_by_name(vv)
        eg.entities<<ee
      end
    end
  end

  if e=Entity.find_by_name(k)
    e.update_attributes({name: v, code: v})
  end
end

sensors.values.flatten.uniq.each do |v|
  if eg=(EntityGroup.find_by_name(v)||EntityGroup.find_by_name(v))
    eg.update_attributes({name: v, code: v})
    if ee=Entity.find_by_name(v)
      eg.entities<<ee
    end
  end
end

KpiProperty.where(name: '异常').update_all(name: 'Exception')


KpiEntry.all.each do |entry|
  if entry.original_value>200
    entry.update_attributes(original_value:entry.original_value/1000)
  end


  ex=(entry.value<5 || entry.value>22) ? 'YES' : 'NO'
  entry.update_attributes(a1: ex)
end



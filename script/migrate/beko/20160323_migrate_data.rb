Department.transaction do

  puts '-------------------------------------'
  puts 'udpate kpi name & targer'
  if kpi=Kpi.find_by_name('WorkingTime')
    kpi.update_attributes(name: 'CircleTime',description:'Circle Time')
    kpi.update_attributes(target_max: 21)
    kpi.user_kpi_items.update_all(target_max: 21)
  end
  puts '-1. add department'


  beko=Department.find_by_name('Beko')
  beko.entity_group.update_attributes(show_index: 0)
  admin=User.find_by_email('admin@beko.com')

  puts '-------------------------------------'
  puts 'add fl'
  fl = Department.new(name: 'FL')
  fl.creator = admin
  fl.parent = beko
  fl.tenant=admin.tenant
  fl.save

  fl.entity_group.update_attributes(show_index: 1)


  puts '-------------------------------------'
  puts 'change fl department name'
  kv0={
      'Drum Assembly Line' => 'FL Drum Assembly Line',
      'Cabinet Assembly Line' => 'FL Cabinet Assembly Line',
      'Main Assembly Line' => 'FL Main Assembly Line', 'Packaging Line' => 'FL Packaging Line'}

  kv0.each do |k, v|
    if d=Department.find_by_name(k)
      d.update_attributes(name: v)
      d.parent=fl
      d.save
    end
  end

  puts '-------------------------------------'
  puts 'add sensors to fl'
  flsensors=[]
  for i in 1..11
    flsensors<< (i>9 ? "1N-C#{i}" : "1N-C0#{i}")
  end

  for i in 1..48
    flsensors<< (i>9 ? "3U-C#{i}" : "3U-C0#{i}")
  end

  if eg=EntityGroup.find_by_name('FL')
    flsensors.each do |s|
      if e=Entity.find_by_name(s)
        eg.entities<<e
      end
    end
  end

  puts '-------------------------------------'
  puts 'update cn name for fl product line'

  kv={
      '滚筒内装配线' => 'FL Drum Assembly Line',
      '滚筒箱体线' => 'FL Cabinet Assembly Line',
      '滚筒总装线' => 'FL Main Assembly Line', '滚筒包装线' => 'FL Packaging Line'}


  kv.each do |k, v|
    if d=Department.find_by_name(v)
      d.update_attributes(cn_name: k, is_product_line: true)
      d.entity_group.update_attributes(show_index: 2)
    end
  end

  puts '-------------------------------------'
  puts 'clean entity group name for 1N & 3U'
  EntityGroup.where("name like '1N-%' or name like '3U-%'").each do |eg|
    eg.update_attributes(name: eg.name.sub(/^\w+-/, ''))
  end

  puts '-------------------------------------'
  puts 'add tl'
  tl = Department.new(name: 'TL')
  tl.creator = admin
  tl.parent = beko
  tl.tenant=admin.tenant
  tl.save
  tl.entity_group.update_attributes(show_index: 1)

  tlkv={
      '波轮内装配线' => 'TL Drum Assembly Line',
      '波轮箱体线' => 'TL Cabinet Assembly Line',
      '波轮生产线' => 'TL Main Assembly Line', '波轮检测线' => 'TL Testing Line'
  }


  puts '-------------------------------------'
  puts 'add tl departments'
  tlkv.each do |k, v|
    d = Department.new(name: v)
    d.creator = admin
    d.parent = tl
    d.tenant=admin.tenant
    d.save
  end

  tlkv.each do |k, v|
    d= Department.find_by_name(v)
    d.update_attributes(cn_name: k, is_product_line: true)
    d.entity_group.update_attributes(show_index: 2)
  end

  puts '-------------------------------------'
  puts 'add tl sensors'
  sensors={
      'TL Drum Assembly Line' => [],
      'TL Cabinet Assembly Line' => [],
      'TL Main Assembly Line' => [],
      'TL Testing Line' => []
  }

#1
  for i in 1..26
    sensors['TL Drum Assembly Line']<< (i>9 ? "ET-#{i}" : "ET-0#{i}")
  end

#sensors['Beko']+= sensors['TL Drum Assembly Line']
#2
  for i in 1..22
    sensors['TL Cabinet Assembly Line']<< (i>9 ? "ES-#{i}" : "ES-0#{i}")
  end

# sensors['Beko']+= sensors['TL Cabinet Assembly Line']

#3
  for i in 23..44
    sensors['TL Main Assembly Line']<< (i>9 ? "ES-#{i}" : "ES-0#{i}")
  end
#  sensors['Beko']+= sensors['TL Main Assembly Line']

#4
  for i in 45..84
    sensors['TL Testing Line']<< (i>9 ? "ES-#{i}" : "ES-0#{i}")
  end
#  sensors['Beko']+= sensors['TL Testing Line']

  p sensors


  sensors.each do |k, v|
    # add department
    parent=Department.find_by_name(k)
    v.each do |vv|
      d = Department.new(name: vv)
      d.creator = admin
      d.parent = parent
      d.tenant=admin.tenant
      d.save
    end
  end


  sensors.each do |k, v|
    # add department
    parent=Department.find_by_name(k)
    v.each do |vv|
      # # add entity to department
      entity=Entity.find_by_name(vv)
      beko.entity_group.entities<<entity
      tl.entity_group.entities<<entity
      parent.entity_group.entities<<entity
    end
  end
end

KpiEntry.each do |e|
  if e.value>50
    p e
    e.destroy
  end
end
Department.transaction do
  if de= Department.find_by_name('TL')
    de.destroy
  end


  Entity.where("name like 'Q-%' or name like 'TL%'").each do |e|
    e.destroy
  end

  User.where("email like 'q%' or email like 'tl%'").each do |e|
    e.destroy
  end
end

Department.transaction do
  beko=Department.find_by_name('Beko')
  admin=User.find_by_email('admin@beko.com')


  puts '-------------------------------------'
  puts 'add tl'
  tl = Department.new(name: 'TL')
  tl.creator = admin
  tl.parent = beko
  tl.tenant=admin.tenant
  p tl.save
  p tl.errors
  tl.entity_group.update_attributes(show_index: 1)

  tlkv={
      '波轮内桶线' => 'TL Drum Assembly Line',
      '波轮生产线' => 'TL Main Assembly Line'
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

  sensors={
      'TL Drum Assembly Line' => ['Q-C05', 'Q-C06', 'Q-C07', 'Q-C09', 'Q-C010', 'Q-C12', 'Q-C13', 'Q-C14', 'Q-C17', 'Q-C19', 'Q-C108'],
      'TL Main Assembly Line' => ['Q-C25', 'Q-C34', 'Q-C36', 'Q-C38', 'Q-C41', 'Q-C43', 'Q-C44', 'Q-C42', 'Q-C24', 'Q-C70', 'Q-C72', 'Q-C79', 'Q-C107', 'Q-C74', 'Q-C76', 'Q-C75', 'Q-C77', 'Q-C78', 'Q-C80', 'Q-C81', 'Q-C82', 'Q-C84','Q-C85', 'Q-C86', 'Q-C87', 'Q-C97', 'Q-C98', 'Q-C101', 'Q-C102', 'Q-C103', 'Q-C104', 'Q-C105'],
  }


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


  Entity.find_by_code('Q-C25').update_attributes(is_last: true)


end
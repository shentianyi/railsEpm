ActiveRecord::Base.transaction do

  # delete current departments
  admin=User.find_by_email('admin@beko.com')
  tenant=Tenant.first


  beko=Department.find_by_name('Beko')

  if de= Department.find_by_name('TL')
    de.destroy
  end


  Entity.where("name like 'Q-%' or name like 'TL%' or code like 'Q-%' ").each do |e|
    e.destroy
  end

  User.where("email like 'q%' or email like 'tl%'").each do |e|
    e.destroy
  end


  puts '-------------------------------------'
  puts 'add tl'
  tl = Department.new(name: 'TL')
  tl.creator = admin
  tl.parent = beko
  tl.tenant=admin.tenant
  p tl.save
  tl.entity_group.update_attributes(show_index: 1)


  tlkv={
      '波轮内桶线' => 'TL Drum Assembly Line',
      '波轮箱体线' => 'TL Cabinet Assembly Line',
      '波轮生产线' => 'TL Main Assembly Line',
      '波轮测试及包装线' => 'TL Test&Packing Assembly Line'
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
      'TL Drum Assembly Line' => ["Q-C01", "Q-C02", "Q-C03", "Q-C04", "Q-C05", "Q-C06", "Q-C07", "Q-C08", "Q-C09", "Q-C10", "Q-C11", "Q-C12", "Q-C13"],
      'TL Cabinet Assembly Line' => ["Q-C14", "Q-C15", "Q-C16", "Q-C17", "Q-C18", "Q-C19", "Q-C20", "Q-C21"],
      'TL Main Assembly Line' => ["Q-C23", "Q-C24", "Q-C25", "Q-C26", "Q-C27", "Q-C28", "Q-C29", "Q-C30", "Q-C31", "Q-C32", "Q-C33", "Q-C34", "Q-C35", "Q-C36"],
      'TL Test&Packing Assembly Line' => ["Q-C37", "Q-C38", "Q-C39", "Q-C40", "Q-C41", "Q-C42", "Q-C43", "Q-C44", "Q-C45", "Q-C46", "Q-C47", "Q-C48", "Q-C49", "Q-C50", "Q-C51", "Q-C52", "Q-C53"]
  }


  p 'add sensors'

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


  Entity.find_by_code('Q-C14').update_attributes(is_last: true)


  p 'assign kpi to user'

  User.all.each do |u|
    if u.entity_id.present?
      Kpi.all.each do |kpi|

        unless kpi.user_kpi_items.where(user_id: u.id, entity_id: u.entity_id).first
          kpi.user_kpi_items.create(
              user_id: u.id,
              entity_id: u.entity_id,
              target_max: 21,
              target_min: 0
          )
        end
      end

    end
  end


end
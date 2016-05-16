name_map={"Beko" => "Beko", "FL Drum Assembly Line" => "FL Drum Assembly Line", "FL Cabinet Assembly Line" => "FL Cabinet Assembly Line", "FL Main Assembly Line" => "FL Main Assembly Line", "FL Packaging Line" => "FL Packaging Line", "1N-C01" => "Bearing Press", "1N-C02" => "Drum", "1N-C03" => "Gasket", "1N-C04" => "Motor", "1N-C05" => "Hose & clamp", "1N-C06" => "Motor (7Kg)", "1N-C07" => "Front counterweight", "1N-C08" => "Air pipe& inlet hose", "1N-C09" => "Up counterweight", "1N-C10" => "Hanger tub", "3U-C01" => "Pre-absorber", "3U-C02" => "Pre-drain hose", "3U-C03" => "Assy absorber", "3U-C04" => "Pre-harness", "3U-C05" => "Fix harness", "3U-C06" => "Power cord", "3U-C07" => "Pre suppressor", "3U-C08" => "F-panel holder", "3U-C09" => "Fix suppressor", "3U-C10" => "Combine drum & cabinet", "3U-C11" => "Fix detergent box", "3U-C12" => "Right absorber pin", "3U-C13" => "Pressure switch", "3U-C14" => "Hanger beam", "3U-C15" => "Panel support", "3U-C16" => "Assy belt", "3U-C17" => "Fix pump", "3U-C18" => "Connet pump & hose", "3U-C19" => "Left absorber pin", "3U-C20" => "Check screw torque", "3U-C21" => "Transport safety bolts 1", "3U-C22" => "Assy door lock", "3U-C23" => "3 harness tie", "3U-C24" => "Front panel", "3U-C25" => "Fix panel&door lock", "3U-C26" => "Assy control panel", "3U-C27" => "Hinge support sheet", "3U-C28" => "Assy heater", "3U-C29" => "Gasket clamp", "3U-C30" => "Transport safety bolts 2", "3U-C31" => "Fix door", "3U-C32" => "Assy drawer panel", "3U-C33" => "Fix control panel", "3U-C34" => "Voltage test", "3U-C35" => "Bottom inspection", "3U-C36" => "Top inspection", "3U-C37" => "Clean water", "3U-C38" => "Clean door&Put inlet pipe", "3U-C39" => "Clean panel&cabinet", "3U-C40" => "Fix power cable", "3U-C41" => "Assy Label", "3U-C42" => "Pre top plate", "3U-C43" => "Fix top plate", "3U-C44" => "Put manual", "3U-C45" => "No station", "3U-C46" => "Appearance inspection", "FL" => "FL", "TL" => "TL", "TL Drum Assembly Line" => "TL Drum Assembly Line", "TL Main Assembly Line" => "TL Main Assembly Line", "Q-C05" => "Input tub", "Q-C06" => "Pre motor", "Q-C07" => "Fix  motor", "Q-C09" => "Assy drain valve", "Q-C10" => "Q-C10", "Q-C12" => "Assy overflow hose", "Q-C13" => "Fix drain motor", "Q-C14" => "Q-C14", "Q-C17" => "Fix big nut", "Q-C19" => "Assy tub cover", "Q-C108" => "Pre impeller", "Q-C25" => "Input cabinet", "Q-C34" => "Install handles", "Q-C36" => "Pre assy chasis", "Q-C38" => "Q-C38", "Q-C41" => "Q-C41", "Q-C43" => "Q-C43", "Q-C44" => "Install grease", "Q-C42" => "Fix cable", "Q-C24" => "Combine tub&cabinet", "Q-C70" => "Pre top cover", "Q-C72" => "Fix top cover", "Q-C79" => "Fix middle hose", "Q-C107" => "Q-C107", "Q-C74" => "Q-C74", "Q-C76" => "Assy sponge", "Q-C77" => "Q-C77", "Q-C78" => "Connet cables", "Q-C80" => "Q-C80", "Q-C81" => "Q-C81", "Q-C82" => "Q-C82", "Q-C84" => "Q-C84", "Q-C85" => "Voltage test", "Q-C86" => "Inlet valve test 1", "Q-C87" => "Inlet valve test 2", "Q-C97" => "Rear cover 3 screw", "Q-C98" => "Rear cover 5 screw", "Q-C101" => "Component cover", "Q-C102" => "Rat mash", "Q-C103" => "Clean tub&inlet hose", "Q-C104" => "Clean top cover&manual", "Q-C105" => "Appearance inspection"}
Department.transaction do
  beko=Department.find_by_name('Beko')
  admin=User.find_by_email('admin@beko.com')

  tl = Department.find_by_name('TL')

  sensors={
      'TL Drum Assembly Line' => ['Q-C05', 'Q-C06', 'Q-C07', 'Q-C08', 'Q-C09', 'Q-C10', 'Q-C12', 'Q-C13', 'Q-C14', 'Q-C16', 'Q-C17', 'Q-C19', 'Q-C108'],
      'TL Main Assembly Line' => ['Q-C26', 'Q-C25', 'Q-C34', 'Q-C36', 'Q-C38', 'Q-C41', 'Q-C43', 'Q-C44', 'Q-C42', 'Q-C24', 'Q-C68', 'Q-C69' 'Q-C70', 'Q-C72', 'Q-C73', 'Q-C79', 'Q-C107', 'Q-C74', 'Q-C76', 'Q-C75', 'Q-C77', 'Q-C78', 'Q-C80', 'Q-C81', 'Q-C82', 'Q-C84', 'Q-C85', 'Q-C86', 'Q-C87', 'Q-C88', 'Q-C90', 'Q-C91', 'Q-C93', 'Q-C97', 'Q-C98', 'Q-C101', 'Q-C102', 'Q-C103', 'Q-C104', 'Q-C105'],
  }


  sensors.each do |k, v|
    # add department
    parent=Department.find_by_name(k)
    v.each do |vv|
      if dd=Department.find_by_name(vv)
        dd.destroy
      end

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
      unless beko.entity_group.entities.where(id: entity.id).first
        beko.entity_group.entities<<entity
      end
      unless tl.entity_group.entities.where(id: entity.id).first
        tl.entity_group.entities<<entity
      end
      unless parent.entity_group.entities.where(id: entity.id).first
        parent.entity_group.entities<<entity
      end
    end
  end


  Entity.find_by_code('Q-C25').update_attributes(is_last: true)
  name_map.each do |k, v|
    if d=Department.find_by_name(k)
      d.update_attributes(name: v)
    end
  end

end
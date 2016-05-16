d={1=>"Beko", 2=>"FL Drum Assembly Line", 3=>"FL Cabinet Assembly Line", 4=>"FL Main Assembly Line", 5=>"FL Packaging Line", 6=>"Bearing Press", 7=>"Drum", 8=>"Gasket", 9=>"Motor", 10=>"Hose & clamp", 11=>"Motor (7Kg)", 12=>"Front counterweight", 13=>"Air pipe& inlet hose", 14=>"Up counterweight", 15=>"Hanger tub", 17=>"Pre-absorber", 18=>"Pre-drain hose", 19=>"Assy absorber", 20=>"Pre-harness", 21=>"Fix harness", 22=>"Power cord", 23=>"Pre suppressor", 24=>"F-panel holder", 25=>"Fix suppressor", 26=>"Combine drum & cabinet", 27=>"Fix detergent box", 28=>"Right absorber pin", 29=>"Pressure switch", 30=>"Hanger beam", 31=>"Panel support", 32=>"Assy belt", 33=>"Fix pump", 34=>"Connet pump & hose", 35=>"Left absorber pin", 36=>"Check screw torque", 37=>"Transport safety bolts 1", 38=>"Assy door lock", 39=>"3 harness tie", 40=>"Front panel", 41=>"Fix panel&door lock", 42=>"Assy control panel", 43=>"Hinge support sheet", 44=>"Assy heater", 45=>"Gasket clamp", 46=>"Transport safety bolts 2", 47=>"Fix door", 48=>"Assy drawer panel", 49=>"Fix control panel", 50=>"Voltage test", 51=>"Bottom inspection", 52=>"Top inspection", 53=>"Clean water", 54=>"Clean door&Put inlet pipe", 55=>"Clean panel&cabinet", 56=>"Fix power cable", 57=>"Assy Label", 58=>"Pre top plate", 60=>"Fix top plate", 61=>"Put manual", 62=>"No station", 63=>"Appearance inspection", 66=>"FL", 228=>"TL", 229=>"TL Drum Assembly Line", 230=>"TL Main Assembly Line", 231=>"Input tub", 232=>"Pre motor", 233=>"Fix  motor", 234=>"Assy drain valve", 236=>"Assy overflow hose", 237=>"Fix drain motor", 239=>"Fix big nut", 240=>"Assy tub cover", 241=>"Pre impeller", 242=>"Input cabinet", 243=>"Install handles", 244=>"Pre assy chasis", 248=>"Install grease", 249=>"Fix cable", 250=>"Combine tub&cabinet", 251=>"Pre top cover", 252=>"Fix top cover", 253=>"Fix middle hose", 256=>"Assy sponge", 259=>"Connet cables", 264=>"Voltage test", 265=>"Inlet valve test 1", 266=>"Inlet valve test 2", 267=>"Rear cover 3 screw", 268=>"Rear cover 5 screw", 269=>"Component cover", 270=>"Rat mash", 271=>"Clean tub&inlet hose", 272=>"Clean top cover&manual", 273=>"Appearance inspection"}



d.each do |k,v|

  if dd=Department.find_by_id(k)
    p dd
    dd.update_attributes(name:v)
    p dd
  end
end

if ddd=Department.find_by_name('Q-C010')
  ddd.update_attributes(name:'Q-C10')
end

if eg=EntityGroup.find_by_code('Q-C010')
  eg.update_attributes(code:'Q-C10')
end

if e=Entity.find_by_code('Q-C010')
  e.update_attributes(name:'Q-C10',code:'Q-C10')
end
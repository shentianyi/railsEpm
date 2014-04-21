KpiEntry.observers.disable :all

kpi_id=1
count=KpiEntry.where(kpi_id: kpi_id, entry_type: 0).count
puts count
properties=Kpi.find(kpi_id).kpi_property_items.all
property_values={}
properties.each do |p|
  values=p.kpi_property_values.all
  property_values[p.kpi_property_id]={count: values.size, values: values}
end


KpiEntry.where(kpi_id: kpi_id, entry_type: 0).each_with_index do |entry, i|
  puts (i+1).to_s.yellow
  r=Random.new
  h={}
  properties.each do |p|
    id=p.kpi_property_id
    i=r.rand(0...property_values[id][:count])
    h["a#{id}"] = property_values[id][:values][i].value
  end
  entry.update_attributes(h);

  puts entry.to_json
end





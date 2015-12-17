Entity.transaction do
  Department.all.each do |d|
    if d.default_entity.blank?
      e=Entity.new(name: d.name, is_default: true, department_id: d.id)
      e.tenant=d.tenant
      e.save
    end
  end
end
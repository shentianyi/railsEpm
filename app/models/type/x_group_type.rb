class XGroupType
  DATE=100
  ENTITY_GROUP=200
  PROPERTY=300

  def self.get_x_group kpi
    groups=[]
    groups<<{name: '*时间', type: DATE,value:nil}
    groups<<{name: '*视图', type: ENTITY_GROUP,value:nil}

    kpi.kpi_properties.each do |p|
      groups<<{name:p.name, type:PROPERTY,value:p.id}
    end
    groups
  end


end
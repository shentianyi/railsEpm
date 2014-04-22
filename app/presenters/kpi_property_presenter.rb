class KpiPropertyPresenter <Presenter
  Delegators=[:id, :name]
  def_delegators :@property, *Delegators

  def initialize(property)
    @property=property
    self.delegators =Delegators
  end

  def self.to_group_select(properties)
    gs={}
    properties.each do |p|
      gs[p.property_id]||={}
      gs[p.property_id][p.property_name]||=[]
      gs[p.property_id][p.property_name]<<{id: p.id, value: p.value}
    end
    return gs
  end

end
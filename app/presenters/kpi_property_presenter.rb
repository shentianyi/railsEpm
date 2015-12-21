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
      if p.id
        gs[p.property_id][p.property_name]<<{id: p.id, value: p.value}
      end
    end
    return gs
  end

  def as_property_details
    {
        id: @property.id,
        name: @property.name,
        type: @property.type
    }
  end

  def as_property_basic_feedback(messages=nil, result_code=nil)
    if @property.nil?
      {
          result_code: 0,
          messages: messages
      }
    else
      {
          result_code: result_code||1,
          messages: messages,
          need_instruction: false,
          customized_field: as_property_details
      }
    end
  end

end
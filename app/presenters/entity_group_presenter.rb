class EntityGroupPresenter<Presenter
  Delegators=[:id, :name, :code, :description, :user_id]
  def_delegators :@entity_group, *Delegators

  def initialize(entity_group)
    @entity_group=entity_group
    self.delegators =Delegators
  end

  def code
    @entity_group.code||''
  end


  def description
    @entity_group.description || ''
  end

  def to_json
    {
        id:self.id,
        name:self.name,
        code:self.code,
        description:self.description,
        user_id:self.user_id
    }
  end
  def to_detail_json
    json=self.to_json
    json[:contacts]=[]
    @entity_group.contacts.select(User.contact_attrs).each do |c|
      json[:contacts]<<c
    end
    return json
  end

end

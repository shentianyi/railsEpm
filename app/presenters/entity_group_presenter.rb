#encoding: utf-8
class EntityGroupPresenter<Presenter
  Delegators=[:id, :name, :code, :description, :user_id]
  def_delegators :@entity_group, *Delegators

  def initialize(email)
    @entity_group=email
    self.delegators =Delegators
  end

  def to_detail_json
    json=self.to_json
    json[:contacts]=[]
    @entity_group.contacts.select('contacts.id,contacts.name,tel,phone,email,title,image_url').each do |c|
      json[:contacts]<<c
    end
    return json
  end

end

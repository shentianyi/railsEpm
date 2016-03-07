#encoding: utf-8
class EntityPresenter<Presenter
  Delegators=[:id, :name,:is_last, :code,:description]
  def_delegators :@entity,*Delegators

  def initialize(entity)
    @entity=entity
    self.delegators =Delegators
  end

end
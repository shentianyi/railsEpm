class KpiPropertyPresenter <Presenter
  Delegators=[:id, :name]
  def_delegators :@property, *Delegators

  def initialize(property)
    @property=property
    self.delegators =Delegators
  end

end
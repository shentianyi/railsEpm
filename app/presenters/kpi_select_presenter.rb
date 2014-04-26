class KpiSelectPresenter<Presenter
  Delegators=[:id,:name,:is_calculated,:frequency,:direction,:unit]
  def_delegators :@kpi,*Delegators

  def initialize(kpi)
    @kpi=kpi
    self.delegators =Delegators
  end

end
#encoding: utf-8
class KpiEntryPresenter<Presenter
  Delegators=[:id,:value,:original_value,:entry_at,:parsed_entry_at]
  def_delegators :@kpi_entry,*Delegators

  def initialize(kpi_entry)
    @kpi_entry = kpi_entry
    self.delegators = Delegators
  end

  def values
    self.value
  end

  def date
    Time.parse(self.entry_at.to_s).strftime("%Y-%m-%d %H:%M:%S")
  end

  def property_val property_id
    @kpi_entry.property_val property_id
  end
end
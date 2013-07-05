#encoding: utf-8
class KpiEntryObserver<ActiveRecord::Observer
  observe :kpi_entry
  # parse entry date and value
  def before_save kpi_entry
    kpi=Kpi.find_by_id(kpi_entry.kpi_id)
if kpi_entry.new_record?
    kpi_entry.parsed_entry_at=KpiEntriesHelper.parse_entry_date(kpi.frequency,kpi_entry.entry_at)
 kpi_entry.frequency=kpi.frequency
end
    kpi_entry.value=KpiUnit.parse_entry_value(kpi.unit,kpi_entry.original_value)
  end

  # calculate parent kpi entry value
  def after_save kpi_entry
    Resque.enqueue(KpiEntryCalculator,kpi_entry.id,kpi_entry.kpi_id)
  end
end

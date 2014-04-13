#encoding: utf-8
class KpiEntryObserver<ActiveRecord::Observer
  observe :kpi_entry
  # parse entry date and value
  def before_save kpi_entry
    kpi_entry.kpi=Kpi.find_by_id(kpi_entry.kpi_id)
    if kpi_entry.new_record?
      kpi_entry.frequency= kpi_entry.kpi.frequency
    end
    if  kpi_entry.original_value.finite?
      kpi_entry.value=KpiUnit.parse_entry_value(kpi_entry.kpi.unit, kpi_entry.original_value)
      kpi_entry.abnormal=false
    else
      kpi_entry.value=kpi_entry.original_value=0
      kpi_entry.abnormal=true
    end
    true
  end

  # calculate parent kpi entry value
  def after_save kpi_entry
    Resque.enqueue(KpiEntryCalculator, kpi_entry.id) unless kpi_entry.kpi.is_calculated
  end
end

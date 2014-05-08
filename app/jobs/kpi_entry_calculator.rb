#encoding: utf-8
class KpiEntryCalculator
  @queue='kpi_entry_calculate_queue'
  def self.perform kpi_id,kpi_entry_id
    #KpiEntriesHelper.calculate_kpi_parent_value kpi_entry_id
    KpiEntriesHelper.calculate_caled_kpi(kpi_id,kpi_entry_id)
  end
end

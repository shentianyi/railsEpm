#encoding: utf-8
class KpiEntryCalculator
  @queue='kpi_entry_calculate_queue'
  def self.perform kpi_entry_id
    puts "--------------"
    KpiEntriesHelper.calculate_kpi_parent_value kpi_entry_id
  end
end

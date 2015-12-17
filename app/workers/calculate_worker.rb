class CalculateWorker
  include Sidekiq::Worker

  sidekiq_options :queue => :kpicaljob, :retry => true, :backtrace => true

  def perform(kpi_entry_id)
    KpiEntriesHelper.calculate_kpi_parent_value(kpi_entry_id)
  end
end

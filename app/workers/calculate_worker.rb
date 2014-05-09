class CalculateWorker
  include Sidekiq::Worker
  sidekiq_options :queue => :kpicaljob, :retry => false, :backtrace => true

  def perform(kpi_id,entry)
    KpiEntriesHelper.calculate_caled_kpi(kpi_id,entry)
  end
end
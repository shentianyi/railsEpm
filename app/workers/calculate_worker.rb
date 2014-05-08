class CalculateWorker
  include Sidekiq::Worker
  sidekiq_options :queue => :kpicaljob, :retry => false, :backtrace => true

  def perform(kpi_id,entry_id)

  end
end
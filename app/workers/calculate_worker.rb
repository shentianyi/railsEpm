class CalculateWorker
  include Sidekiq::Worker
  #include Sidekiq::Benchmark::Worker

  sidekiq_options :queue => :kpicaljob, :retry => false, :backtrace => true

  def perform(kpi_id,entry)
    #benchmark.first_metric do
    KpiEntriesHelper.calculate_caled_kpi(kpi_id,entry)
    #end
  end

=begin
  def self.job_name(kpi_id,entry)
    Kpi.find_by_id(kpi_id).name + entry.parsed_entr_at.to_s
  end
=end
end

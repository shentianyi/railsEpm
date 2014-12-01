class BackgroundTask
  def self.send_email(email_id,params)
    case $BACKGROUND_TASK
      when BackgroundTaskType::SIDEKIQ
        EmailWorker.perform_async(email_id,params)
      when BackgroundTaskType::RESQUE
        Resque.enqueue(EmailSender,email_id,params)
    end
  end

  def self.calculate_kpi(entry)
    case $BACKGROUND_TASK
      when BackgroundTaskType::SIDEKIQ
        CalculateWorker.perform_async(entry.id)
      when BackgroundTaskType::RESQUE
        Resque.enqueue(KpiEntryCalculator,entry.id)
    end
  end

  def self.create_kpi_entry(entries)
    case $BACKGROUND_TASK
      when BackgroundTaskType::SIDEKIQ
        Resque.enqueue(KpiEntryCreateJob, entries)
      when BackgroundTaskType::RESQUE
        KpiEntryCreateWorker.perform_async(entries)
    end
  end
end
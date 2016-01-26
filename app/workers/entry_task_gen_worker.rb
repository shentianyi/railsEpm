class EntryTaskGenWorker
  include Sidekiq::Worker

  sidekiq_options :queue => :entry_task, :retry => true, :backtrace => true

  def perform(time, frequency)
    Task::EntryTaskService.generate_task(time, frequency)
  end
end

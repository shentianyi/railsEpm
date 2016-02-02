module Alert
  class PushWorker
    include Sidekiq::Worker

    sidekiq_options :queue => :push, :retry => true, :backtrace => true

    def perform(alert_id)
      Alert::PushService.send_notification(alert_id)
    end
  end
end
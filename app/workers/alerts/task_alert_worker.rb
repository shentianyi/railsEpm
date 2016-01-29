#encoding: utf-8
module Alerts

  class TaskAlertWorker
    include Sidekiq::Worker

    sidekiq_options :queue => :alerts, :retry => true

    def perform(id)
      # begin
      if task=Task::EntryItem.find_by_id(id)
        KafkaAlertsService.create_producer_connection([Settings.kafka_server.host_port]) do |producer|
          producer.send_messages([Poseidon::MessageToSend.new(task.taskable.alert.topic, "KPI #{task.taskable.kpi.name} is due in 1 min Today 3:00 pm.")])
        end
      else
        # raise 'not found'
        puts id
      end
      # end
    end

  end
end
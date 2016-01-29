#encoding: utf-8
module Alerts
  class AssignAlertWorker
    include Sidekiq::Worker

    sidekiq_options :queue => :alerts, :retry => true

    def perform(id)
      if uki=UserKpiItem.find_by_id(id)
        #create task alert
        topic="alert-#{AlertType::TASK}-#{uki.user_id}-#{uki.kpi_id}-#{uki.department_id}-#{uki.frequency}"
        task_alert=Alert.new({topic: topic, type: AlertType::TASK})
        task_alert.user=uki.user
        task_alert.alertable=uki
        uki.alert=task_alert
        if task_alert.save
          KafkaAlertsService.create_producer_connection([Settings.kafka_server.host_port]) do |producer|
            producer.send_messages([Poseidon::MessageToSend.new(topic, "KPI #{uki.kpi.name} Task Assign.")])
          end
        end
      else
        raise 'not found'
      end
    end

  end
end
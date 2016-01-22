#encoding: utf-8

class TaskAlertWorker
  include Sidekiq::Worker

  sidekiq_options :queue => :alerts, :retry => true

  def perform(id)
    if uki=UserKpiItem.find_by_id(id)
      #create task alert
      topic="#{uki.user_id}-#{uki.kpi_id}-#{uki.department_id}-#{uki.frequency}"
      task_alert=Alert.new({topic: topic, type: AlertType::TaskAlert})
      task_alert.user=uki.user
      task_alert.alertable=uki
      uki.alerts<<task_alert
      if task_alert.save
        KafkaAlertsService.create_producer_connection([Settings.kafka_server.host_port]) do |producer|
          puts Time.now
          producer.send_messages([Poseidon::MessageToSend.new(topic, "KPI #{uki.kpi.name} is due in 1 min Today 3:00 pm.")])
          puts Time.now
        end
      end

    else
      raise 'not found'
    end


  end

end
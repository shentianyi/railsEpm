#encoding: utf-8

class SystemAlertWorker
  include Sidekiq::Worker

  sidekiq_options :queue => :alerts, :retry => true

  def perform(id)
    if ks=KpiSubscribe.find_by_id(id)
      #create kpi followed alert
      topic="#{ks.user_id}-#{ks.kpi_id}-#{ks.department_id}"
      kpi_followed_alert=Alert.new({topic: topic, type: AlertType::KpiFollowedAlert})
      kpi_followed_alert.user=ks.user
      kpi_followed_alert.alertable=ks
      ks.alerts<<kpi_followed_alert

      if kpi_followed_alert.save
        KafkaAlertsService.create_producer_connection([Settings.kafka_server.host_port]) do |producer|
          # puts Time.now
          producer.send_messages([Poseidon::MessageToSend.new(topic, "#{ks.user.nick_name} Follow The KPI #{ks.kpi.name} At Department #{ks.department.name} Success.")])
          # puts Time.now
        end
      end

    else
      raise 'not found'
    end


  end

end
#encoding: utf-8
require 'poseidon'

class KafkaAlertsService

  def self.create_producer_connection brokers, client_id='ClearInsight'
    producer=Poseidon::Producer.new(brokers, client_id)

    if block_given?
      yield(producer)
    end

    producer.close
  end

  def self.create_alert message, topic, brokers, client_id='ClearInsight'
    producer=Poseidon::Producer.new(brokers, client_id)
    producer.send_messages([Poseidon::MessageToSend.new(topic, message)])
    producer.close
  end


  def self.fetch_alerts(topic, offset, client_id='ClearInsight')
    begin
      host='localhost'
      port=9092
      consumer=Poseidon::PartitionConsumer.new(client_id, host, port, topic, 0, offset)
      messages=consumer.fetch({max_wait_ms: 10})
      consumer.close

      return messages
    rescue => e
      # raise e
    end
  end

end



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

  def self.create_alerts messages, topic, brokers
    producer=Poseidon::Producer.new(brokers, 'ClearInsight')

    alerts=[]
    messages.each do |m|
      alerts<<Poseidon::MessageToSend.new(topic, m)
    end

    producer.send_messages(alerts)
    producer.close
  end


  def self.fetch_alerts(topic, offset, client_id='ClearInsight')
    host='localhost'
    port=9092
    consumer=Poseidon::PartitionConsumer.new(client_id, host, port, topic, 0, offset)
    messages=consumer.fetch
    consumer.close

    return messages
  end
end



require 'thrift_client'
require 'clear_insight'


$ci= ThriftClient.new(ClearInsight::Thrift::ClearInsightService::Client,
                      'localhost:9001', retries: 5, timeout: 100000)
if defined?(PhusionPassenger)
  PhusionPassenger.on_event(:starting_worker_process) do |forked|
    if forked
      $ci = ThriftClient.new(ClearInsight::Thrift::ClearInsightService::Client,
                             '127.0.0.1:9001', :retries => 2)
    end
  end
end

require 'thrift_client'
#require 'clear_insight'
#<<<<<<< HEAD
#
#$ci= ThriftClient.new(ClearInsight::Thrift::ClearInsightService::Client,
#                           'localhost:9001', :retries => 5)
#puts $ci.Ping
## if defined?(PhusionPassenger)
##   PhusionPassenger.on_event(:starting_worker_process) do |forked|
##     if forked
##       $ci = ThriftClient.new(ClearInsight::Thrift::ClearInsightService::Client,
##                                  '127.0.0.1:9001', :retries => 2)
##     end
##   end
## end
#=======
#
#$ci= ThriftClient.new(ClearInsight::Thrift::ClearInsightService::Client,
#                      'localhost:9001', retries: 5, timeout: 100000)
#if defined?(PhusionPassenger)
#  PhusionPassenger.on_event(:starting_worker_process) do |forked|
#    if forked
#      $ci = ThriftClient.new(ClearInsight::Thrift::ClearInsightService::Client,
#                             '127.0.0.1:9001', :retries => 2)
#    end
#  end
#end
#>>>>>>> 3167ed3bfa9beaf68ce248aae496b97b11317185

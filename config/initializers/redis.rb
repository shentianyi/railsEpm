require 'rake'
require "resque/server"
require "resque/tasks"

$redis=Redis.new(:host => "127.0.0.1",:port => "6379",:db=>6)

if defined?(PhusionPassenger)
  PhusionPassenger.on_event(:starting_worker_process) do |forked|
    if forked
      $redis.client.disconnect
      $redis=Redis.new(:host => "127.0.0.1",:port => "6379",:db=>6)
    end
  end
end
# redis resque
Resque.redis=Redis::Namespace.new("prefix_resque_job_", :redis => $redis)
#redis user_guide_hash
$redis_guid = Redis::Namespace.new("user_guid_pair",:redis=>$redis)


Dir["#{Rails.root}/app/jobs/*.rb"].each { |file| require file }


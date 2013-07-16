require "resque/server"

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
Dir["#{Rails.root}/app/jobs/*.rb"].each { |file| require file }

# rake resque:work COUNT=5 QUEUE=*  PIDFILE=tmp/pids/resque.pid BACKGROUND=yes INTERVAL=1
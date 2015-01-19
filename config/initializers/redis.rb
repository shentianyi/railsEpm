require 'rake'
require "resque/server"
require "resque/tasks"


$default_db=6
$default_db=7 if Rails.env.demo?
$default_db=8 if Rails.env.demo_cn?
$default_db=9 if Rails.env.jiangnan?

$redis=Redis.new(:host => "127.0.0.1",:port => "6379",:db=>$default_db)

if defined?(PhusionPassenger)
  PhusionPassenger.on_event(:starting_worker_process) do |forked|
    if forked
      $redis.client.disconnect
      $redis=Redis.new(:host => "127.0.0.1",:port => "6379",:db=>$default_db)
    end
  end
end
# redis resque
Resque.redis=Redis::Namespace.new("prefix_resque_job_", :redis => $redis)
#redis user_guide_hash
$redis_guid = Redis::Namespace.new("user_guid_pair",:redis=>$redis)


Dir["#{Rails.root}/app/jobs/*.rb"].each { |file| require file }


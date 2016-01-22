sidekqi_redis_conn =proc {
  Redis::Namespace.new("sidekiq", :redis => $redis)
}
#

Sidekiq.configure_server do |config|
  config.redis = ConnectionPool.new(size: 25, &sidekqi_redis_conn)
end

#
Sidekiq.configure_client do |config|
  config.redis = ConnectionPool.new(size: 25, &sidekqi_redis_conn)
end

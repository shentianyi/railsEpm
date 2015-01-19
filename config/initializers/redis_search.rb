require "redis"
require "redis-namespace"
require "redis-search"

# don't forget change the namespace
$redis_search = Redis::Namespace.new("ClearInsight:redis_search", :redis => $redis)


Redis::Search.configure do |config|
  config.redis = $redis_search
  config.complete_max_length = 100
  config.pinyin_match = true
  config.disable_rmmseg =true
end
# TagCount.new
ActiveRecord::Base.connection.tables.map do |model|
  _name = model.capitalize.singularize.camelize
  if  Kernel.class_defined?(_name)
    _class=eval _name
    _class.new if _class.respond_to?(:redis_search_index)
  end
end
#encoding:utf-8
require 'base_class'

class KpiEntryAnalyseCache<CZ::BaseClass
 attr_accessor :id,:cacheable_type,:query,:chart_data,:table_data

 def self.find_by_id id,cacheable_type
  key=generate_key(cacheable_type,id)
  if $redis.exists key
      cache=self.new($redis.hgetall key)
      # cache.chart_data=JSON.parse(cache.chart_data)
      # cache.table_data=JSON.parse(cache.table_data)
      return cache
  end
 end


 def save
  $redis.hmset key,'id',self.id,'cacheable_type',self.cacheable_type,'query',query,'chart_data',chart_data.to_json,'table_data',table_data
 end

 def destroy
  $redis.del key if $redis.exists(key)
 end 
 private
 
 def key
  KpiEntryAnalyseCache.generate_key self.cacheable_type,self.id
 end

 def self.generate_key cacheable_type,id
  "kpi_entry_analy_cache:#{cacheable_type}:#{id}"
 end
end


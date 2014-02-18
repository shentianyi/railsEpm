#encoding:utf-8
class KpiEntryAnalyseCache 
 attr_accessor :key,:cacheable_type,:query,:data

 def initialize key,query,data
  #$redis.mhset generate_key,{cacheable_type}
 end

 private
 def generate_key
  "kpi_entry_analy_cache:#{self.cacheable_type}:#{self.key}"
 end
end


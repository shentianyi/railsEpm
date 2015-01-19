#encoding: utf-8
class KpiEntryBak < ActiveRecord::Base
  self.set_table_name('kpi_entries')
  belongs_to :user_kpi_item
  belongs_to :kpi ,:class_name=>'Kpi',:foreign_key=>'kpi_id'

  attr_accessible :entry_at, :frequency,:value,:original_value,:parsed_entry_at,:abnormal
  attr_accessible :user_kpi_item_id,:kpi_id,:entity_id,:user_id,:target_max,:target_min

  RECENT_INPUT_NUM=5

  after_save :set_recent_input
  after_destroy :rem_recent_input
  def self.recent_input user_id,user_kpi_item_ids,time
    values=[]
    user_kpi_item_ids.each do |user_kpi_item_id|
      time_key=gen_recent_time_zscore_key(user_id,user_kpi_item_id)
      uuids= $redis.zrevrangebyscore(time_key,time,0,:limit=>[0,RECENT_INPUT_NUM])
      v=[]
      f=false
      if uuids
        value_key=gen_recent_value_zscore_key user_id,user_kpi_item_id
        uuids.each do |uuid|
          v<<$redis.zscore(value_key,uuid) unless (f=($redis.zscore(time_key,uuid)==time))
        end
      end
      values<<{:id=>user_kpi_item_id,:values=> f ? v.reverse : v[0..3].reverse}
    end
    return values
  end

  private

  def self.gen_recent_time_zscore_key user_id,user_kpi_item_id
    "user:#{user_id}:kpi_item:#{user_kpi_item_id}:time:zscore"
  end

  def self.gen_recent_value_zscore_key user_id,user_kpi_item_id
    "user:#{user_id}:kpi_item:#{user_kpi_item_id}:value:zscore"
  end

  def set_recent_input
    time_key=KpiEntry.gen_recent_time_zscore_key user_id,user_kpi_item_id
    score=(Time.parse(self.parsed_entry_at.to_s).to_f*1000).to_i
    $redis.zremrangebyscore(time_key,score,score)
    uuid=SecureRandom.hex
    $redis.zadd(time_key,score, uuid)

    value_key=KpiEntry.gen_recent_value_zscore_key user_id,user_kpi_item_id
    $redis.zadd(value_key,self.value, uuid)
  end

  def rem_recent_input
    time_key=KpiEntry.gen_recent_time_zscore_key self.user_id,self.user_kpi_item_id
    score=(Time.parse(self.parsed_entry_at.to_s).to_f*1000).to_i
    uuid=$redis.zrangebyscore(time_key,score,score)
    $redis.zremrangebyscore(time_key,score,score)

    value_key=KpiEntry.gen_recent_value_zscore_key self.user_id,self.user_kpi_item_id
    $redis.zrem(value_key,uuid)
  end
end

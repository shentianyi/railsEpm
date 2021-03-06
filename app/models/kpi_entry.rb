class KpiEntry
  include Mongoid::Document
  include Mongoid::Timestamps
  include DynamicAttributeSupport
  #
  # base field
  field :kpi_id, type: Integer
  field :user_id, type: Integer
  field :entity_id, type: Integer
  field :tenant_id, type: Integer
  field :user_kpi_item_id, type: Integer

  field :target_max, type: BigDecimal
  field :target_min, type: BigDecimal
  field :value, type: BigDecimal
  field :original_value, type: BigDecimal
  field :entry_at, type: DateTime
  field :parsed_entry_at, type: DateTime
  field :frequency, type: Integer
  # entry_type is a mark of calculated or not
  # default query use 1
  field :entry_type, type: Integer, :default => 0
  field :abnormal, type: Boolean, :default => false
  # dynamic field
  #field :properties, type: Hash
  #embeds_many :properties

  def self.dynamic_field_name
    'properties'
  end

  def self.date_map_filed
    'parsed_entry_at'
  end


  def kpi
    if (kpi = Kpi.find_by_id(self.kpi_id)).nil?
      nil
    else
      kpi
    end
  end


    def self.map
      map=%Q{
           function(){
  emit({kpi_id:this.kpi_id,entity_id:this.entity_id},parseFloat(this.value));
      };
     }
      map1=%Q{
       function(){
           emit({date:this.parsed_entry_at.getFullYear()+'-'+(this.parsed_entry_at.getMonth()+1)+'-'+this.parsed_entry_at.getDate()},
               parseFloat(this.value));
        };
      }

      map=%Q{
           function(){
  emit({property:this.:1},parseFloat(this.value));
      };
     }

      reduce=%Q{
          function(key,values){
  return Array.sum(values);
  }
      }
      KpiEntry.where(kpi_id:1,entry_type:1).map_reduce(map1, reduce).out(inline: true)
    end


  RECENT_INPUT_NUM = 5
  after_save :set_recent_input
  after_destroy :rem_recent_input

  def self.recent_input user_id, user_kpi_item_ids, time
    values=[]
    if user_id.nil? || user_kpi_item_ids.nil? || time.nil?
      return values
    end

    user_kpi_item_ids.each do |user_kpi_item_id|
      time_key=gen_recent_time_zscore_key(user_id, user_kpi_item_id)
      uuids= $redis.zrevrangebyscore(time_key, time, 0, :limit => [0, RECENT_INPUT_NUM])
      v=[]
      f=false
      if uuids
        value_key=gen_recent_value_zscore_key user_id, user_kpi_item_id
        uuids.each do |uuid|
          v<<$redis.zscore(value_key, uuid) unless (f=($redis.zscore(time_key, uuid)==time))
        end
      end
      values<<{:id => user_kpi_item_id, :values => f ? v.reverse : v[0..3].reverse}
    end
    return values
  end

  def last_detail?
    KpiEntry.where(user_kpi_item_id: self.user_kpi_item_id, parsed_entry_at: self.parsed_entry_at, entity_id: self.entity_id,entry_type: self.entry_type).first.nil?
  end

  def property_val property_id
    key = "a"+property_id.to_s
    if self[key].nil?
      ""
    else
      self[key]
    end
  end

  private

  def self.gen_recent_time_zscore_key user_id, user_kpi_item_id
    "user:#{user_id}:kpi_item:#{user_kpi_item_id}:time:zscore"
  end

  def self.gen_recent_value_zscore_key user_id, user_kpi_item_id
    "user:#{user_id}:kpi_item:#{user_kpi_item_id}:value:zscore"
  end

  def set_recent_input
    #only when entry_type is 1
    #fit for input in the web ,not detail kpi_entry
    if entry_type == 1
      time_key=KpiEntry.gen_recent_time_zscore_key user_id, user_kpi_item_id
      score=(Time.parse(self.parsed_entry_at.to_s).to_f*1000).to_i
      $redis.zremrangebyscore(time_key, score, score)
      uuid=SecureRandom.hex
      $redis.zadd(time_key, score, uuid)

      value_key=KpiEntry.gen_recent_value_zscore_key user_id, user_kpi_item_id
      $redis.zadd(value_key, self.value, uuid)
    end
  end

  def rem_recent_input
=begin
    if self.entry_type == 1
      time_key=KpiEntry.gen_recent_time_zscore_key self.user_id, self.user_kpi_item_id
      score=(Time.parse(self.parsed_entry_at.to_s).to_f*1000).to_i
      uuid=$redis.zrangebyscore(time_key, score, score)
      $redis.zremrangebyscore(time_key, score, score)

      value_key=KpiEntry.gen_recent_value_zscore_key self.user_id, self.user_kpi_item_id
      $redis.zrem(value_key, uuid)
    end
=end
  end


end

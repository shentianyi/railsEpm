#encoding: utf-8
class KpiEntryValidatorCollection
  attr_accessor :cache_key, :valid, :validators, :base_validators

  def initialize
    self.cache_key="validator_collection:#{SecureRandom.uuid}"
    self.valid=true
    self.validators=[]
    self.base_validators={}
  end

  def destroy
    $redis.del self.cache_key
  end

  def add_base_validator validator
    self.base_validators[validator.item_cache_key.to_sym]= validator
  end

  def add_validator validator
    self.validators<<validator
  end

  def valid_validator validator
    self.base_validators[validator.item_cache_key.to_sym]
  end

  def invalid_message
    message=[]
    self.validators.each_with_index do |v, i|
      message<<"data index:#{i+1} error: #{v.content.join(';')}" unless v.valid
    end
    return message
  end

  def entry
    entries=[]
    self.validators.each do |v|
      entries<<v.params_to_hash if v.valid
    end
    Resque.enqueue(KpiEntryCreateJob, entries)
    #KpiEntryCreateWorker.perform_async(entries)

    #entries.each do |k|
    #  if kpi_entry=KpiEntry.where(user_kpi_item_id: k[:user_kpi_item_id],
    #                              parsed_entry_at: k[:entry_at],
    #                              entity_id: k[:entity_id]).first
    #    kpi_entry.update_attributes(:original_value => k[:value])
    #  else
    #    KpiEntry.new(original_value: k[:value],
    #                 user_kpi_item_id: k[:user_kpi_item_id],
    #                 parsed_entry_at: k[:entry_at],
    #                 entity_id: k[:entity_id],
    #                 user_id: k[:user_id],
    #                 target_max: k[:target_max],
    #                 target_min: k[:target_min],
    #                 kpi_id: k[:kpi_id]).save
    #  end
    #end
    
  end
end
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
    # BackgroundTask.create_kpi_entry(entries)
    entries.each do |k|
      Entry::OperateService.new.insert_entry(k)
    end
  end
end
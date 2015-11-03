#encoding: utf-8
class KpiEntryValidatorCollection
  attr_accessor :cache_key, :valid, :validators, :base_validators
  attr_accessor :has_data_key

  def initialize(has_data_key=false)
    self.cache_key="validator_collection:#{SecureRandom.uuid}"
    self.valid=true
    self.validators=[]
    self.base_validators={}
    self.has_data_key = has_data_key
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
    messages=[]
    if self.has_data_key
      self.validators.each { |v|
        unless v.valid
          message={}
          message[v.data_key]=v.content
          messages<<message
        end
      }
    else
      self.validators.each_with_index do |v, i|
        messages<<"#{v.content.join(';')}" unless v.valid
      end
    end
    messages
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
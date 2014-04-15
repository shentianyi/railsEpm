#encoding: utf-8
class KpiEntryValidator
  attr_accessor :email, :kpi_id, :kpi_name, :frequency, :date, :value, :entry_at, :user_kpi_item_id, :value, :item_cache_key, :valid, :content, :parsed_entry_at, :entry_type
  attr_accessor :validator_collection, :user_kpi_item, :kpi, :valid_by_cache
  attr_accessor :entity_id, :user_id, :target_max, :target_min
  attr_accessor :kpi_properties
  attr_accessor :source

  def initialize args={}
    self.valid=true
    self.valid_by_cache=false
    args.each do |k, v|
      instance_variable_set "@#{k}", v
    end
    self.item_cache_key="kpi_entry_validator:#{self.email}:#{self.kpi_id}"
    self.date=self.date.to_s
    self.value=self.value.to_s
    self.content=[]
    self.validator_collection.add_validator(self) if self.validator_collection
  end

  def invalid_message
    self.content.join(';')
  end

  def validate
    unless self.date.is_date?
      self.valid=false
      self.content<<I18n.t('vali_msg.invalid_date')
    end

    unless self.value.to_s.is_number?
      self.valid=false
      self.content<<I18n.t('vali_msg.invalid_value')
    end

    if self.validator_collection && (self.source=self.validator_collection.valid_validator(self))
      self.valid_by_cache=true
      self.valid=self.source.valid
      self.content << self.source.content
    else
      if user=User.find_by_email(self.email)
        if kpi=Kpi.find_by_id(self.kpi_id)
          unless user_kpi_item=UserKpiItem.find_by_user_id_and_kpi_id(user.id, kpi.id)
            self.valid=false
            self.content<<I18n.t('vali_msg.kpi_not_assign')
          else
            self.kpi=kpi
            self.user_kpi_item=user_kpi_item
          end
        else
          self.valid=false
          self.content<<I18n.t('vali_msg.invalid_kpi')
        end
      else
        self.valid=false
        self.content<<I18n.t('vali_msg.invalid_user_email')
      end
      self.validator_collection.add_base_validator(self)  if self.validator_collection
    end
    prepare_params if self.valid
  end

  def entry
    if kpi_entry=KpiEntry.where(user_kpi_item_id: self.user_kpi_item_id, parsed_entry_at: self.parsed_entry_at, entity_id: self.entity_id).first
      kpi_entry.update_attributes(:original_value => self.value)
    else
      KpiEntry.new(original_value: self.value, user_kpi_item_id: self.user_kpi_item_id, entry_at:self.entry_at,parsed_entry_at: self.parsed_entry_at, entity_id: self.entity_id,
                   user_id: self.user_id, target_max: self.target_max, target_min: self.target_min, kpi_id: self.kpi_id,entry_type:1,).save
    end
  end

  def prepare_params
    source = self.valid_by_cache ? self.source : self
    self.kpi_id=source.kpi_id
    self.frequency=source.kpi.frequency
    self.user_kpi_item_id=source.user_kpi_item.id
    self.user_id=source.user_kpi_item.user_id
    self.entity_id=source.user_kpi_item.entity_id
    self.target_max=source.user_kpi_item.target_max
    self.target_min=source.user_kpi_item.target_min
    self.date=Date.parse(self.date).to_s
    self.entry_at = Time.parse(self.date).utc #KpiEntriesHelper.parse_entry_string_date self.frequency,self.date
    self.parsed_entry_at = KpiEntriesHelper.parse_entry_string_date self.frequency,self.date
  end

  def params_to_hash
    {value:self.value,kpi_id: self.kpi_id, frequency: self.frequency, user_kpi_item_id: self.user_kpi_item_id,
     user_id: self.user_id, entity_id: self.entity_id, target_max: self.target_max,
     target_min: self.target_min, entry_at: self.entry_at, parsed_entry_at: self.parsed_entry_at}
  end

end

#encoding: utf-8
class KpiEntryValidatorCollection
  attr_accessor :cacke_key,:valid,:validators
  def initialize
    self.cache_key="validator_collection:#{SecureRandom.uuid}"
    self.valid=true
    self.validators=[]
  end

  def destroy
    $redis.del self.cache_key
  end

end

class KpiEntryValidator
  attr_accessor :email,:kpi_id,:kpi_name,:frequency,:date,:value,:entry_at,:user_kpi_item_id,:value,:item_cache_key,:valid,:content
  attr_accessor :validator_collection,:user_kpi_item,:kpi,:valid_by_cache
  attr_accessor :entity_id,:user_id,:target_max,:target_min
  def initialize args={}
    self.valid=true
    self.valid_by_cache=false

    args.each do |k,v|
      instance_variable_set "@#{k}",v
    end

    self.item_cache_key="kpi_entry_validator:#{self.email}:#{self.kpi_id}:#{self.kpi_name}"
    self.date=self.date.to_s
    self.value=self.value.to_s
    self.content=[]
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
    if valided?
      else
      if user=User.find_by_email(self.email)
        if kpi=Kpi.find_by_id_and_name(self.kpi_id,self.kpi_name)
          unless user_kpi_item=UserKpiItem.find_by_user_id_and_kpi_id(user.id,kpi.id)
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
    end
    entry if self.valid
  end

  def valided?
    self.valid_by_cache=false
  end

  def entry
    prepare_params
    if kpi_entry=KpiEntry.where(user_kpi_item_id:self.user_kpi_item_id,parsed_entry_at:self.entry_at,entity_id:self.entity_id).first
      kpi_entry.update_attributes(:original_value=>self.value)
    else
      KpiEntry.new(original_value:self.value,user_kpi_item_id:self.user_kpi_item_id,parsed_entry_at:self.entry_at,entity_id:self.entity_id,
      user_id:self.user_id,target_max:self.target_max,target_min:self.target_min,kpi_id:self.kpi_id).save
    end
  end

  def prepare_params
    if valid_by_cache

    else
    self.kpi_id=self.kpi.id
    self.frequency=self.kpi.frequency
    self.user_kpi_item_id=self.user_kpi_item.id
    self.user_id=self.user_kpi_item.user_id
    self.entity_id=self.user_kpi_item.entity_id
    self.target_max=self.user_kpi_item.target_max
    self.target_min=self.user_kpi_item.target_min
    end
    parse_date
  end

  def parse_date
    self.date=Date.parse(self.date).to_s
    self.entry_at=  case self.frequency
    when KpiFrequency::Hourly
      DateTimeHelper.parse_string_to_date_hour(self.date)
    when KpiFrequency::Daily
      Time.strptime(self.date,'%Y-%m-%d')
    when KpiFrequency::Weekly
      date=Date.parse(self.date)
      Date.commercial(date.year,date.cweek,1)
    when KpiFrequency::Monthly
      Time.strptime(self.date,'%Y-%m-01')
    when KpiFrequency::Quarterly
      month=Date.parse(self.date).month
      Time.strptime(self.date,"%Y-#{date.month-month%3}-01")
    when KpiFrequency::Yearly
      Time.strptime(self.date,'%Y-01-01')
    end
  end
end

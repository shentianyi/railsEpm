class KpiEntry
  include Mongoid::Document
  include Mongoid::Timestamps
  #
  # base field
  field :kpi_id, type: Integer
  field :user_id, type: Integer
  field :entity_id, type: Integer
  field :tenant_id, type: Integer
  field :user_kpi_item_id, type: Integer

  field :entry_at, type: String
  field :parsed_entry_at, type: DateTime
  field :original_value, type: BigDecimal
  field :value, type: BigDecimal
  field :target_max, type: BigDecimal
  field :target_min, type: BigDecimal
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

end

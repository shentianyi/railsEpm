class KpiEntry
  include Mongoid::Document
  include Mongoid::Timestamps

  # base field
  field :kpi_id, type: Integer
  field :user_id, type: Integer
  field :entity_id, type: Integer
  field :entry_at, type: DateTime
  field :value, type: BigDecimal
  field :parsed_entry_at, type: DateTime
  field :user_kpi_item_id, type: Integer
  field :tenant_id, type: Integer
  field :entrytype, type: Integer
  field :frequency, type: Integer
  field :target_max, type: BigDecimal
  field :target_min, type: BigDecimal

  # dynamic field
  field :properties, type: Hash
  #embeds_many :properties

  def self.dynamic_field_name
    'properties'
  end
end

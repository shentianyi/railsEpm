class KpiEntry
  include Mongoid::Document
  include Mongoid::Timestamps

  # base field
  field :kpi_id, type: Integer
  field :user_id, type: Integer
  field :entity_id, type: Integer
  field :date, type: DateTime
  field :value, type: BigDecimal

  # dynamic field
  field :properties, type: Hash
  #embeds_many :properties

  def self.dynamic_field_name
    'properties'
  end
end

class KpiPropertyItem < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :kpi_id,:kpi_property_id
  belongs_to :kpi_property
  has_one :kpi_property
end

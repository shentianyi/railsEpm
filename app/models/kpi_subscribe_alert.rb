class KpiSubscribeAlert < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessor :alert_type, :tenant_id, :value, :kpi_subscribe_id

  belongs_to :tenant
  belongs_to :kpi_subscribe
end

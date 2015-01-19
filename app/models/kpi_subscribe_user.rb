class KpiSubscribeUser < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :user_id, :kpi_subscribe_id

  belongs_to :user
  belongs_to :kpi_subscribe
end

class KpiProperty < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name,:user_id,:tenant_id

  has_many :kpi_property_items, :dependent => :destroy

  acts_as_tenant(:tenant)
end

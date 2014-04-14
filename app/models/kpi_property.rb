class KpiProperty < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name,:user_id,:tenant_id
  belongs_to :user
  belongs_to :tenant
  has_many :kpi_property_items, :dependent => :destroy
  has_many :kpi_property_values, :dependent => :destroy

  acts_as_tenant(:tenant)
end

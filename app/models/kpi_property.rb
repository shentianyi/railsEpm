class KpiProperty < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name,:user_id,:tenant_id
  belongs_to :user
  belongs_to :tenant
  has_many :kpi_property_items, :dependent => :destroy
  has_many :kpi_property_values, :through =>:kpi_property_items, :dependent => :destroy

  acts_as_tenant(:tenant)

  def self.property_values kpi_id,kpi_property_id
    item = KpiPropertyItem.where("kpi_id = ? AND kpi_property_id = ?",kpi_id,kpi_property_id)
    if item.nil?
      nil
    else
      item.kpi_property_values.pluck(:value)
    end
  end
end

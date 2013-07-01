#encoding: utf-8
class KpiCategory < ActiveRecord::Base
  belongs_to :tenant
  has_many :kpis
  attr_accessible :kpi_quantity, :name,:description

  acts_as_tenant(:tenant)
end

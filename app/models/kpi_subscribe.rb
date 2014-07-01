class KpiSubscribe < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessor :user_id,:tenant_id,:kpi_id
  belongs_to :user
  belongs_to :tenant
  belogns_to :kpi

  has_one :chart_condition,  :as => :chartable, :dependent => :destroy
  has_many :kpi_subscribe_users, :dependent => :destroy
  has_many :kpi_subscribe_alerts, :dependent => :destroy
end

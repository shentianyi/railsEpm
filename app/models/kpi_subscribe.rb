class KpiSubscribe < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessor :user_id,:tenant_id,:kpi_id
  belongs_to :user
  belongs_to :tenant
  belongs_to :kpi

  has_one :chart_condition,  :as => :chartable, :dependent => :destroy
  has_many :kpi_subscribe_users, :dependent => :destroy
  has_many :kpi_subscribe_alerts, :dependent => :destroy

  #在每个KpiEntry被更新或者修改时出发
  def execute kpi_entry
    if self.chart_condition.check kpi_entry
      self.kpi_subscribe_alerts.each do |alert|
        alert.execute kpi_entry
      end
    end
  end
end

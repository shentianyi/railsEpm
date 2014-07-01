class KpiSubscribe < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :user_id,:tenant_id,:kpi_id
  belongs_to :user
  belongs_to :tenant
  belongs_to :kpi

  has_one :chart_condition,  :as => :chartable, :dependent => :destroy
  has_many :kpi_subscribe_users, :dependent => :destroy
  has_many :kpi_subscribe_alerts, :dependent => :destroy

  #在每个KpiEntry被更新或者修改时出发
  def execute kpi_entry
    if self.chart_condition.check kpi_entry
      query = AnalyseService.chart_condition_filter(self.chart_condition)
      query[:start_time] = kpi_entry.parsed_entry_at.to_s
      query[:end_time] = kpi_entry.parsed_entry_at.to_s
      data = Entry::Analyzer.new(query).analyse

      self.kpi_subscribe_alerts.each do |alert|
        if alert.execute data[:current]
          alert_user
          return
        end
      end
    end
  end

  def description
    self.chart_condition.entity_group.name
  end

  def alert_user
    UserMessage.add_subscription_message(self.user.id)
  end
end

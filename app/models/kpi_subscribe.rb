class KpiSubscribe < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :user_id, :tenant_id, :kpi_id, :is_alert, :alert_by_sms, :alert_by_email, :department_id, :auto_notification
  belongs_to :user
  belongs_to :tenant
  belongs_to :kpi
  belongs_to :department

  has_one :chart_condition, :as => :chartable, :dependent => :destroy
  has_many :kpi_subscribe_users, :dependent => :destroy
  has_many :kpi_subscribe_alerts, :dependent => :destroy

  has_one :max_kpi_subscribe_alert,class_name: 'KpiSubscribeAlert',conditions: {alert_type: Kpi::SubscribeAlert::MAX}
  has_one :min_kpi_subscribe_alert,class_name: 'KpiSubscribeAlert',conditions: {alert_type: Kpi::SubscribeAlert::MIN}

  after_save :create_follow_flag
  before_destroy :delete_follow_flag

  acts_as_tenant

  #在每个KpiEntry被更新或者修改时出发
  def execute kpi_entry
    if self.chart_condition.check(kpi_entry) && !self.is_alert
      query = AnalyseService.chart_condition_filter(self.chart_condition)
      query[:start_time] = kpi_entry.parsed_entry_at.to_s
      query[:end_time] = kpi_entry.parsed_entry_at.to_s
      data = Entry::Analyzer.new(query).analyse
      self.kpi_subscribe_alerts.each do |alert|
        if alert.execute data[:current]
          alert_user
          puts 'ALERT================='
          self.is_alert = true
          self.save
          return
        end
      end
    end
  end

  def self.detail_by_id(id)
    joins(:kpi).where(id: id).select('kpis.kpi_category_id,kpi_subscribes.*')
  end

  def description
    'Subscribe the '+self.chart_condition.kpi.name + ' of '+self.chart_condition.entity_group.name
  end

  def alert_user
    UserMessage.add_subscription_message(self.user.id)
  end

  def kpi_user_subscribe
    @kpi_user_subscribe||=KpiUserSubscribe.where(kpi_id: self.kpi_id, user_id: self.user_id,department_id: self.department_id).first
  end


  def self.followed_details_by_user(user)
    user.kpi_subscribes.joins(:kpi).joins(:department)
  end



  def upper_boundary
    self.max_kpi_subscribe_alert.nil? ? 0 : self.max_kpi_subscribe_alert.value
  end

  def lower_boundary
    self.min_kpi_subscribe_alert.nil? ? 0 : self.min_kpi_subscribe_alert.value
  end

  private

  def create_follow_flag
    if self.kpi_user_subscribe.nil?
      kus= KpiUserSubscribe.new(kpi_id: self.kpi_id,department_id:self.department_id, user_id: self.user_id, follow_flag: Kpi::KpiFollowFlag::ALL)
      kus.tenant=self.tenant
      kus.save
    end
  end

  def delete_follow_flag
    if self.kpi_user_subscribe
      self.kpi_user_subscribe.destroy
    end
  end

  # def update_follow_flag
  #   if self.kpi_user_subscribe.nil?
  #     kus= KpiUserSubscribe.new(kpi_id: self.kpi_id,department_id:self.department_id, user_id: self.user_id, follow_flag: Kpi::KpiFollowFlag::ALL)
  #     kus.tenant=self.tenant
  #     kus.save
  #   end
  #
  #   # KpiFollowFlagWorker.perform_async(self.user_id, self.kpi_id,self.department_id)
  # end
end

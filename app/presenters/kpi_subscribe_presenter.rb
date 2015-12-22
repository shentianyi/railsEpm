#encoding: utf-8
class KpiSubscribePresenter<Presenter
  Delegators=[:id, :user_id, :tenant_id, :kpi_id, :is_alert, :alert_by_sms, :alert_by_email, :department_id, :auto_notification, :user, :department, :kpi]
  def_delegators :@user, *Delegators

  def initialize(kpi_subscribe)
    @kpi_subscribe=kpi_subscribe
    self.delegators =Delegators
  end

  def upper_boundary
    @kpi_subscribe.max_kpi_subscribe_alert.nil? ? 0 : @kpi_subscribe.max_kpi_subscribe_alert.value
  end

  def lower_boundary
    @kpi_subscribe.min_kpi_subscribe_alert.nil? ? 0 : @kpi_subscribe.min_kpi_subscribe_alert.value
  end

  def as_followed_detail(user)
    {
        user: UserPresenter.new(user).as_brief_info(false),
        kpi: KpiPresenter.new(@kpi_subscribe.kpi).as_basic_info(false),
        department: DepartmentPresenter.new(@kpi_subscribe.department).as_brief_info(false),
        lower_boundary: self.lower_boundary,
        upper_boundary: self.upper_boundary,
        current_value: 0 # TODO finish the current value
    }
  end


  def self.as_followed_details(kpi_subscribes, user)
    infos=[]
    kpi_subscribes.each do |kpi_subscribe|
      infos<< KpiSubscribePresenter.new(kpi_subscribe).as_followed_detail(user)
    end
    infos
  end

end
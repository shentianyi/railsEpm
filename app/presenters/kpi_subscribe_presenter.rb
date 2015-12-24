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
        follow_id: @kpi_subscribe.id,
        last_updated_at: Time.now.utc,
        user: UserPresenter.new(user).as_brief_info(false),
        kpi: KpiPresenter.new(@kpi_subscribe.kpi).as_basic_info(true, true),
        department: DepartmentPresenter.new(@kpi_subscribe.department).as_brief_info(false),
        lower_boundary: self.lower_boundary,
        upper_boundary: self.upper_boundary,
        lower_boundary_text: KpiUnit.get_value_display(@kpi_subscribe.kpi.unit, self.lower_boundary),
        upper_boundary_text: KpiUnit.get_value_display(@kpi_subscribe.kpi.unit, self.upper_boundary),
        current_value: 0, # TODO finish the current value
        current_value_text: KpiUnit.get_value_display(@kpi_subscribe.kpi.unit, 0),
        over_lower_boundary: true,
        over_upper_boundary: false
    }
  end

  def as_followed(user)
    {
        follow_id: @kpi_subscribe.id,
        last_updated_at: Time.now.utc,
        user: UserPresenter.new(user).as_brief_info(false),
        kpi: KpiPresenter.new(@kpi_subscribe.kpi).as_basic_info(false),
        department: DepartmentPresenter.new(@kpi_subscribe.department).as_brief_info(false),
        lower_boundary: self.lower_boundary,
        upper_boundary: self.upper_boundary,
        lower_boundary_text: KpiUnit.get_value_display(@kpi_subscribe.kpi.unit, self.lower_boundary),
        upper_boundary_text: KpiUnit.get_value_display(@kpi_subscribe.kpi.unit, self.upper_boundary),
        current_value: 0, # TODO finish the current value
        current_value_text: KpiUnit.get_value_display(@kpi_subscribe.kpi.unit, 0),
        over_lower_boundary: true,
        over_upper_boundary: false
    }
  end


  def self.as_followed_details(kpi_subscribes, user)
    infos=[]
    kpi_subscribes.each do |kpi_subscribe|
      infos<< KpiSubscribePresenter.new(kpi_subscribe).as_followed(user)
    end
    infos
  end

end
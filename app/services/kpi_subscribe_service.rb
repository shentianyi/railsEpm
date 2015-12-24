class KpiSubscribeService
  def self.user_followed_detail user, kpi_subscribe_id
    if sub= user.kpi_subscribes.where(id: kpi_subscribe_id).first
      KpiSubscribePresenter.new(sub).as_followed_detail(user)
    else
      ApiMessage.new(messages: ['User not follow this KPI'])
    end
  end
end
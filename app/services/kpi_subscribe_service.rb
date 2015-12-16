class KpiSubscribeService
  def self.user_followed_kpis user
    kpi_subscribes = KpiSubscribe.where(user_id: user.id).group(:kpi_id)
  end

  def self.follow_kpi params
    kpi = Kpi.find_by_id(params[:ks][:kpi_id])
    department = Department.find_by_id(params[:ks][:department_id])
    KpiSubscribe.transaction do
      if kpi && department
        kpi_subscribe = KpiSubscribe.new(params[:ks])
        kpi_subscribe.tenant_id = params[:user].tenant_id
        kpi_subscribe.user_id = params[:user].id

        alerts = []
        alerts << KpiSubscribeAlert.new({
                                            alert_type: "MAX",
                                            value: params[:upper_boundary],
                                            tenant_id: params[:user].tenant_id
                                        })
        alerts << KpiSubscribeAlert.new({
                                            alert_type: "MIN",
                                            value: params[:lower_boundary],
                                            tenant_id: params[:user].tenant_id
                                        })
        kpi_subscribe.kpi_subscribe_alerts = alerts

        if kpi_subscribe.save
          ApiMessage.new(result_code: 1, messages: ['Followed This Kpi Success'])
        else
          ApiMessage.new(messages: kpi_subscribe.errors.full_messages)
        end
      else
        ApiMessage.new(messages: ['Kpi Or Department Not Exist'])
      end
    end
  end

  def self.unfollow_kpi params
    kpi = Kpi.find_by_id(params[:kpi_id])
    department = Department.find_by_id(params[:department_id])
    if kpi && department
      kpi_subscribe = KpiSubscribe.where(tenant_id: params[:user].tenant_id, user_id: params[:user].id, kpi_id: params[:kpi_id], department_id: params[:department_id]).first
      KpiSubscribe.transaction do
        if kpi_subscribe
          if kpi_subscribe.destroy
            # kpi_subscribe.kpi_subscribe_alerts = nil
            ApiMessage.new(result_code: 1, messages: ['UnFollowed This Kpi Success'])
          else
            ApiMessage.new(messages: kpi_subscribe.errors.full_messages)
          end
        else
          ApiMessage.new(messages: ['UnFollowed This Kpi'])
        end
      end
    else
      ApiMessage.new(messages: ['Kpi Or Department Not Exist'])
    end
  end

end
class AlertService


  def self.get_latest_kpi_follow_alert(kpi_subscribe_id)
    if ks=KpiSubscribe.find_by_id(kpi_subscribe_id)
      if ks.alert_item.blank?
        ApiMessage.new(messages: ['Alert Not Found'])
      else
        Alert::ItemPresenter.new(ks.alert_item).as_brief_info
      end
    else
      ApiMessage.new(messages: ['Kpi Follow Not Found'])
    end
  end

  def self.read_alert id
    if alert=Alert::Item.find_by_id(id)
      alert.update_attributes(status: Alert::Status::READ)
      ApiMessage.new(result_code: 1, messages: ['Alert Set Read'])
    else
      ApiMessage.new(messages: ['Alert Not Found'])
    end
  end

  def self.unread_alerts_count user
    task_alerts_count=0
    kpi_followed_alerts_count=0
    system_alerts_count=0

    if alerts=user.alert_items.where(status: Alert::Status::UNREAD).select("count(*) as count, type").group(:type)
      alerts.each do |alert|
        case alert.type
          when Alert::Type::TASK
            task_alerts_count += alert.count
          when Alert::Type::KPI_FOllOW
            kpi_followed_alerts_count += alert.count
          when Alert::Type::ADD_TO_DISCUSSION
            system_alerts_count += alert.count
          when Alert::Type::ADD_TO_DEPARTMENT
            system_alerts_count += alert.count
          when Alert::Type::ASSIGN_KPI
            system_alerts_count += alert.count
        end
      end
    end
    p alerts


    [
        {
            alert_type: Alert::Type::TASK,
            alert_type_text: Alert::Type.display(Alert::Type::TASK),
            count: task_alerts_count
        },
        {
            alert_type: Alert::Type::KPI_FOllOW,
            alert_type_text: Alert::Type.display(Alert::Type::KPI_FOllOW),
            count: kpi_followed_alerts_count
        },
        {
            alert_type: Alert::Type::SYSTEM,
            alert_type_text: Alert::Type.display(Alert::Type::SYSTEM),
            count: system_alerts_count
        }
    ]
  end

  def self.by_alert_type(user, type, page=0, size=20)
    Alert::ItemPresenter.as_brief_infos(Alert::Item.by_type(type).where(user_id: user.id).order('created_at desc').offset(page*size).limit(size))
  end

end
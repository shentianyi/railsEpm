class AlertService
  def self.unread_alerts_count user
    task_alerts_count=0
    kpi_followed_alerts_count=0
    system_alerts_count=0

    user.alerts.each do |alert|
      if msgs=KafkaAlertsService.fetch_alerts(alert.topic, (alert.offset<0 ? 0 : alert.offset))
        case alert.type
          when AlertType::TaskAlert
            task_alerts_count += (msgs.last.offset-alert.offset)
          when AlertType::KpiFollowedAlert
            kpi_followed_alerts_count += (msgs.last.offset-alert.offset)
          when AlertType::SystemAlert
            system_alerts_count += (msgs.last.offset-alert.offset)
        end
      end
    end

    [
        {
            alert_type: {
                id: AlertType::TaskAlert,
                name: "task alerts"
            },
            alert_type_text: "task alerts",
            count: task_alerts_count
        },
        {
            alert_type: {
                id: AlertType::KpiFollowedAlert,
                name: "kpi follow alerts"
            },
            count: kpi_followed_alerts_count
        },
        {
            alert_type: {
                id: AlertType::SystemAlert,
                name: "system alerts"
            },
            count: system_alerts_count
        }
    ]
  end

  def self.read_alert id, offset
    if alert=Alert.find_by_id(id)
      alert.update_attribute("offset", offset)
      ApiMessage.new(result_code: 1, messages: ['Alert Read Success'])
    else
      ApiMessage.new(messages: ['Alert Not Found'])
    end
  end

  def self.get_latest_kpi_follow_alert(kpi_subscribe_id)
    if ks=KpiSubscribe.find_by_id(kpi_subscribe_id)
      if ks.alerts.blank?
        ApiMessage.new(messages: ['Alert Not Found'])
      else
        alert=ks.alerts.first
        if msg=KafkaAlertsService.fetch_alerts(alert.topic, (alert.offset+1)).last
          {
              head: {
                  alert_id: alert.id,
                  alert_text: msg.value,
                  alert_offset: msg.offset,
                  created_at: Time.now.utc.to_s,
                  sender: 'System'
              },
              unread: msg.offset>alert.offset,
              handle_type: {
                  id: 1,
                  name: "manual read"
              }
          }
        else
          ApiMessage.new(messages: ['Alert Not Found'])
        end
      end
    else
      ApiMessage.new(messages: ['Kpi Followed Not Found'])
    end
  end

  def self.task_alerts user, page=0, size=20
    items=[]
    user.alerts.where(type: AlertType::TaskAlert).offset(page*size).limit(size).each do |alert|
      if msgs=KafkaAlertsService.fetch_alerts(alert.topic, (alert.offset+1))

        # unless msgs.blank?
        msgs.each do |msg|
          items<<{
              head: {
                  alert_id: alert.id,
                  alert_text: msg.value,
                  alert_offset: msg.offset,
                  created_at: Time.now.utc.to_s,
                  sender: 'System'
              },
              unread: msg.offset>alert.offset,
              handle_type: {
                  id: 1,
                  name: "manual read"
              },
              data: Task::EntryItemPresenter.new(alert.alertable).as_basic_info
          }
        end
      end
    end

    items
  end

  def self.kpi_followed_alerts user, page=0, size=20
    items=[]
    user.alerts.where(type: AlertType::KpiFollowedAlert).offset(page*size).limit(size).each do |alert|
      if msgs=KafkaAlertsService.fetch_alerts(alert.topic, (alert.offset+1))

        unless msgs.blank?
          msgs.each do |msg|
            items<<{
                head: {
                    alert_id: alert.id,
                    alert_text: msg.value,
                    alert_offset: msg.offset,
                    created_at: Time.now.utc.to_s,
                    sender: 'System'
                },
                unread: msg.offset>alert.offset,
                handle_type: {
                    id: 1,
                    name: "manual read"
                }
            }
          end
        end
      end
    end

    items
  end

  def self.system_alerts user, page=0, size=20
    items=[]
    user.alerts.where(type: AlertType::SystemAlert).offset(page*size).limit(size).each do |alert|
      if msgs=KafkaAlertsService.fetch_alerts(alert.topic, (alert.offset+1))

        unless msgs.blank?
          msgs.each do |msg|
            items<<{
                head: {
                    alert_id: alert.id,
                    alert_text: msg.value,
                    alert_offset: msg.offset,
                    created_at: Time.now.utc.to_s,
                    sender: 'System'
                },
                unread: msg.offset>alert.offset,
                handle_type: {
                    id: 1,
                    name: "manual read"
                }
            }
          end
        end
      end
    end

    items
  end

end
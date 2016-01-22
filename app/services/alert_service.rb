class AlertService


  def self.get_latest_kpi_follow_alert(user, kpi_subscribe_id)
    {
        follow_id: kpi_subscribe_id,
        head: {
            alert_id: 1,
            alert_text: 'the kpi exeeds the max limit for 5 days alredy, do you want to do something?(hard code)',
            created_at: Time.now.utc,
            sender: 'System'
        },
        handle_type: {
            id: 1,
            name: "manual read"
        }
    }
  end

  def self.unread_alerts_count user
    task_alerts_count=0
    kpi_followed_alerts_count=0
    system_alerts_count=0

    user.alerts.each do |alert|
      msgs=KafkaAlertsService.fetch_alerts(alert.topic, (alert.offset<0 ? 0 : alert.offset))

      case alert.type
        when AlertType::TaskAlert
          task_alerts_count += (msgs.last.offset-alert.offset)
        when AlertType::KpiFollowedAlert
          kpi_followed_alerts_count += (msgs.last.offset-alert.offset)
        when AlertType::SystemAlert
          system_alerts_count += (msgs.last.offset-alert.offset)
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

  def self.task_alerts user, page=0, size=20
    items=[]
    user.alerts.where(type: AlertType::TaskAlert).offset(page*size).limit(size).each do |alert|
      msgs=KafkaAlertsService.fetch_alerts(alert.topic, (alert.offset+1))

      unless msgs.blank?
        msgs.each do |msg|
          items<<{
              head: {
                  alert_id: alert.id,
                  alert_text: msg.value,
                  created_at: Time.now.utc.to_s,
                  sender: 'System'
              },
              unread: msg.offset>alert.offset,
              handle_type: {
                  id: 1,
                  name: "manual read"
              },
              data: {
                  task_item_id: alert.alertable.id,
                  due_flag: false,
                  to_due_at: Time.now.utc.to_s,
                  dued_at: Time.now.utc.to_s,
                  status: 'due_in_plan',
                  status_value: 1
              }
          }
        end
      end
    end

    items
  end

  def self.kpi_followed_alerts user, page=0, size=20
    items=[]
    user.alerts.where(type: AlertType::KpiFollowedAlert).offset(page*size).limit(size).each do |alert|
      msgs=KafkaAlertsService.fetch_alerts(alert.topic, (alert.offset+1))

      unless msgs.blank?
        msgs.each do |msg|
          items<<{
              head: {
                  alert_id: alert.id,
                  alert_text: msg.value,
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

    items
  end

  def self.system_alerts user, page=0, size=20
    items=[]
    user.alerts.where(type: AlertType::SystemAlert).offset(page*size).limit(size).each do |alert|
      msgs=KafkaAlertsService.fetch_alerts(alert.topic, (alert.offset+1))

      unless msgs.blank?
        msgs.each do |msg|
          items<<{
              head: {
                  alert_id: alert.id,
                  alert_text: msg.value,
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

    items
  end

end
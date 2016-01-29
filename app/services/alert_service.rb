class AlertService


  def self.get_latest_kpi_follow_alert(kpi_subscribe_id)
    if ks=KpiSubscribe.find_by_id(kpi_subscribe_id)
      if ks.alert_item.blank?
        ApiMessage.new(messages: ['Alert Not Found'])
      else
        {
            head: {
                alert_id: ks.alert_item.id,
                alert_type: ks.alert_item.type,
                alert_text: "#{ks.user.nick_name} Follow The KPI #{ks.kpi.name} At Department #{ks.department.name} Success.",
                created_at: ks.alert_item.created_at.utc.to_s,
                sender: 'System'
            },
            unread: ks.alert_item.status,
            handle_type: {
                id: 1,
                name: "manual read"
            }
        }

      end
    else
      ApiMessage.new(messages: ['Kpi Followed Not Found'])
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

    if alerts=user.alert_items.select("count(*) as count, type").group(:type)
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

  def self.task_alerts user, page=0, size=20
    items=[]

    user.alert_items.where(type: Alert::Type::TASK).each do |alert|
      items<<{
          head: {
              alert_id: alert.id,
              alert_type: alert.type,
              alert_text: "KPI #{alert.alertable.blank? ? '' : alert.alertable.taskable.kpi.name} is due in 1 min Today 3:00 pm.",
              created_at: alert.created_at.utc.to_s,
              sender: 'System'
          },
          unread: alert.status,
          handle_type: {
              id: 1,
              name: "manual read"
          },
          data:{
              id:alert.alertable.id,
              due_flag: alert.alertable.due?
          }
              #alert.alertable.blank? ? '' : Task::EntryItemPresenter.new(alert.alertable).as_basic_info
      }
    end

    items
  end

  def self.system_alerts user, page=0, size=20
    items=[]

    user.alert_items.where(type: Alert::Type.systems).each do |alert|

      text=case alert.type
             when Alert::Type::ADD_TO_DISCUSSION
               "you are add to discussion #{alert.alertable.story_set.title}"
             else
               ''
           end

      items<<{
          head: {
              alert_id: alert.id,
              alert_type: alert.type,
              alert_text: text,#"KPI #{alert.alertable.blank? ? '' : alert.alertable.taskable.kpi.name} is due in 1 min Today 3:00 pm.",
              created_at: alert.created_at.utc.to_s,
              sender: 'System'
          },
          unread: alert.status,
          handle_type: {
              id: 1,
              name: "manual read"
          },
          data:{
              id: alert.alertable_id
          }
      }
    end

    items
  end

  def self.kpi_followed_alerts user, page=0, size=20
    items=[]

    user.alert_items.where(type: Alert::Type::KPI_FOllOW).each do |alert|
      items<< {
          head: {
              alert_id: alert.id,
              alert_type: alert.type,
              alert_text: "#{alert.user.nick_name} Follow The KPI #{alert.alertable.kpi.name} At Department #{alert.alertable.department.name} Success.",
              created_at: alert.created_at.utc.to_s,
              sender: 'System'
          },
          unread: alert.status,
          handle_type: {
              id: 1,
              name: "manual read"
          },
          data:{
              id: alert.alertable_id
          }
      }
    end

    items
  end

end
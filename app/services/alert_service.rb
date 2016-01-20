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
    [
        {
            alert_type: 1,
            alert_type_text: "task alerts",
            count: 3
        },
        {
            alert_type: 2,
            alert_type_text: "kpi follow alerts",
            count: 3
        },
        {
            alert_type: 3,
            alert_type_text: "system alerts",
            count: 3
        }
    ]
  end

  def self.task_alerts user, page=0, size=20
    items=[]
    size.times do |i|
      if i<9
        created_at=(Time.now+i.hours).utc.to_s
        handle_type= {
            id: 1,
            name: "manual read"
        }
        unread=true
      else
        created_at=(Time.now-i.hours).utc.to_s
        handle_type= {
            id: 0,
            name: "auto read"
        }
        unread=false
      end

      items<<{
          head: {
              alert_id: 1,
              alert_text: "the kpi is due in #{i} min",
              created_at: created_at,
              sender: 'System'
          },
          unread: unread,
          handle_type: handle_type,
          data:{
              task_item_id: i,
              due_flag: false,
              to_due_at: Time.now.utc.to_s,
              dued_at: Time.now.utc.to_s,
              status: 'due_in_plan',
              status_value: 1
          }
      }
    end
    items
  end

  def self.system_alerts user, page=0, size=20
    items=[]
    size.times do |i|
      if i<9
        created_at=(Time.now+i.hours).utc.to_s
        handle_type= {
            id: 1,
            name: "manual read"
        }
        unread=true
      else
        created_at=(Time.now-i.hours).utc.to_s
        handle_type= {
            id: 0,
            name: "auto read"
        }
        unread=false
      end

      items<<{
          head: {
              alert_id: 1,
              alert_text: "you are invited to discussion group why the kpi exeeds 3 for 5 days",
              created_at: created_at,
              sender: 'System'
          },
          unread: unread,
          handle_type: handle_type
      }
    end
    items
  end

  def self.kpi_followed_alerts user, page=0, size=20
    items=[]
    size.times do |i|
      if i<9
        created_at=(Time.now+i.hours).utc.to_s
        handle_type= {
            id: 1,
            name: "manual read"
        }
        unread=true
      else
        created_at=(Time.now-i.hours).utc.to_s
        handle_type= {
            id: 0,
            name: "auto read"
        }
        unread=false
      end

      items<<{
          head: {
              alert_id: 1,
              alert_text: "the kpi from department exeeds the max limit, current value is 1#{i}%",
              created_at: created_at,
              sender: 'System'
          },
          unread: unread,
          handle_type: handle_type
      }
    end
    items
  end

end
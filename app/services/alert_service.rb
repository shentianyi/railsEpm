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
        handle_type: 1
    }
  end
end
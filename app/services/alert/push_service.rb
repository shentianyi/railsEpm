module Alert
  class PushService
    def self.send_notification alert_id
      if alert=Alert.find_by_id(alert_id)
        if (user=alert.user) && user.device_token.present?
          notification = Houston::Notification.new(device: user.device_token)
          notification.alert = {
              # "title"=>"jajack",
              #  "body"=>"helloi......",
              "loc-key" => "ASSIGN-KPI-ALERT-FORMAT",
              "loc-args" => %w(jack hellen),
              "action-loc-key" => "ALERT-LIST"
          }
#notification.alert ="Hello, World!An example of the token sent back when a device registers for notifications"

# Notifications can also change the badge count, have a custom sound, have a category identifier, indicate available Newsstand content, or pass along arbitrary data.
          notification.badge = '2'
#notification.sound = "default"
#notification.category = "INVITE_CATEGORY"
#notification.content_available = true
#notification.custom_data = {foo: "bars"}

# And... sent! That's all it takes.
          APN.push(notification)
        end
      end
    end
  end
end
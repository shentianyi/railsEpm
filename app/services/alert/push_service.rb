module Alert
  class PushService
    def self.send_notification alert_id
      if alert=Alert::Item.find_by_id(alert_id)
        # p alert
        if (user=alert.user) && user.device_token.present?
          notification = Houston::Notification.new(device: user.device_token)
          notification.alert = {
              "loc-key" => alert.push_loc_key,
              "loc-args" => alert.push_loc_args,
              "action-loc-key" => "ALERT-LIST"
          }

          notification.badge =Alert::Item.where(status: Alert::Status::UNREAD).count
          # p notification
          # p notification.badge
          APN.push(notification)
        end
      end
    end
  end
end
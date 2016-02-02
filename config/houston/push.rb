require 'houston'

# Environment variables are automatically read, or can be overridden by any specified options. You can also
# conveniently use `Houston::Client.development` or `Houston::Client.production`.
APN = Houston::Client.development
APN.certificate = File.read('./PushKey.pem')
#APN.certificate = File.read('./old/PNKey.pem')
# An example of the token sent back when a device registers for notifications
token = '<678c2ac4 71d7f0e8 8e9d0673 91277b9d e8cc1acd a92aeb86 800753b6 30e725f3>'

# Create a notification that alerts a message to the user, plays a sound, and sets the badge on the app
notification = Houston::Notification.new(device: token)
notification.alert = {
   # "title"=>"jajack",
   #  "body"=>"helloi......",
    "loc-key" => "ASSIGN-KPI-ALERT-FORMAT",
    "loc-args" => %w(jack hellen),
    "action-loc-key"=>"ALERT-LIST"
}
#notification.alert ="Hello, World!An example of the token sent back when a device registers for notifications"

# Notifications can also change the badge count, have a custom sound, have a category identifier, indicate available Newsstand content, or pass along arbitrary data.
notification.badge = '2'
#notification.sound = "default"
#notification.category = "INVITE_CATEGORY"
#notification.content_available = true
#notification.custom_data = {foo: "bars"}

# And... sent! That's all it takes.
p APN.push(notification)
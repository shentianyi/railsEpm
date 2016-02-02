require 'houston'

# Environment variables are automatically read, or can be overridden by any specified options. You can also
# conveniently use `Houston::Client.development` or `Houston::Client.production`.
APN = Houston::Client.development
APN.certificate = File.read('./PushKey.pem')
#APN.certificate = File.read('./old/PNKey.pem')
# An example of the token sent back when a device registers for notifications
token = '<dc04a9e2 d6a59824 8a1f203d 2b0e1e17 ac5dcd56 b8b134d2 c70d1754 203351da>'

# Create a notification that alerts a message to the user, plays a sound, and sets the badge on the app
notification = Houston::Notification.new(device: token)
notification.alert = "Hello, World!An example of the token sent back when a device registers for notifications"

# Notifications can also change the badge count, have a custom sound, have a category identifier, indicate available Newsstand content, or pass along arbitrary data.
notification.badge = 'N'
notification.sound = "default"
notification.category = "INVITE_CATEGORY"
notification.content_available = true
notification.custom_data = {foo: "bars"}

# And... sent! That's all it takes.
p APN.push(notification)
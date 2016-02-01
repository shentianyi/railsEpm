require 'houston'

# Environment variables are automatically read, or can be overridden by any specified options. You can also
# conveniently use `Houston::Client.development` or `Houston::Client.production`.
APN = Houston::Client.development
APN.certificate = File.read('./PNKey.pem')

# An example of the token sent back when a device registers for notifications
token = "<9e446ff5 c730904f 6bb6619e ad4b893e e8f4dee5 f452e799 4bbd86fd a4ff7141>"

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
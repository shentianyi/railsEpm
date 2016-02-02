require 'grocer'
pusher = Grocer.pusher(
    certificate: "./PushKey.pem",      # required
    gateway:     "gateway.sandbox.push.apple.com", # optional; See note below.
    port:        2195,                     # optional
    retries:     3                         # optional
)


notification = Grocer::Notification.new(
    device_token:      "678c2ac471d7f0e88e9d067391277b9de8cc1acda92aeb86800753b630e725f3",
    alert:             "Hello from Grocer!",
    badge:             42,
    category:          "a category",         # optional; used for custom notification actions
    sound:             "siren.aiff",         # optional
    expiry:            Time.now + 60*60,     # optional; 0 is default, meaning the message is not stored
    identifier:        1234,                 # optional; must be an integer
    content_available: true                  # optional; any truthy value will set 'content-available' to 1
)

pusher.push(notification)
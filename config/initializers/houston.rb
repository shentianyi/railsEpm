require 'houston'
APN = Houston::Client.development
APN.certificate = File.read("#{Rails.root}/config/houston/PushKey.pem")
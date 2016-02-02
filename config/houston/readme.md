#. 注册notification方法
http://blog.csdn.net/showhilllee/article/details/8631734
生成Key的时候使用:
方法:
openssl pkcs12 -in cert.p12 -out apple_push_notification_production.pem -nodes -clcerts
不然会报错:unable to load client certificate private key file


#.ruby 调试方法
https://ruby-china.org/topics/8087


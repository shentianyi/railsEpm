说明：
 用以新建帐号
 
命令：
rails runner script/init_data/create_new_tenant.rb <email> <password> <tenant name>

参数说明：
email: 初始用户邮箱地址
password: 密码
tenant name: 公司名称

 User.new.create_tenant_user!('admin@ifscma.com','1111','1111','EPM SH')

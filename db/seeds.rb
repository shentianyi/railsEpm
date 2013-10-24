# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
unless user=User.find_by_email('admin@ifscm.com')
  user=User.new.create_tenant_user!('admin@ifscm.com','123456@','123456@','IFSCM')
end
user.update_attributes(:is_sys=>true)
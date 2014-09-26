class MigrateContactsToUsers < ActiveRecord::Migration
  def up
    Contact.all.each do |c|
      unless user=User.find_by_email(c.email)
        user=User.new(first_name: c.name, email: c.email, password: '123456', password_confirmation: '123456',
                      tel: c.tel, phone: c.phone, image_url: c.image_url, title: c.title, role_id: Role.director)
        user.tenant=c.tenant
        user.save
        puts "new user:#{user.email}........."
      end
      user.update_attributes(tel: c.tel, phone: c.phone, image_url: c.image_url, title: c.title)
      c.entity_contacts.update_all(user_id: user.id)
    end
  end

  def down
  end

end

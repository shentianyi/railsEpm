class System


  def self.init
    # init first system user
    unless user=User.find_by_email('admin@ci.com')
      user=User.new.create_tenant_user!('admin', 'admin@ci.com', '123456@', '123456@', 'ClearInsight')
    end
    user.update_attributes(:is_sys => true)

    # init oauth app
    unless default_app
      app=Doorkeeper::Application.new(name: Settings.oauth.application.name,
                                      uid: Settings.oauth.application.uid,
                                      redirect_uri: Settings.oauth.application.redirect_uri)
      app.owner = user
      app.save
    end

    # init first system user access token
    user.generate_access_token

    # update nick name
    User.where(nick_name: ['', nil]).each { |u| u.update_attributes(nick_name: u.first_name) }

  end

  def self.default_app
    Doorkeeper::Application.by_uid(Settings.oauth.application.uid)
  end
end
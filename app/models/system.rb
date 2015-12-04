class System

  DEFAULT_OAUTH_APP=Doorkeeper::Application.by_uid(Settings.oauth.application.uid)


  def self.init
    # init first system user
    unless user=User.find_by_email('admin@ci.com')
      user=User.new.create_tenant_user!('admin', 'admin@ci.com', '123456@', '123456@', 'ClearInsight')
    end
    user.update_attributes(:is_sys => true)

    unless DEFAULT_OAUTH_APP
      # init oauth app
      app=Doorkeeper::Application.new(name: Settings.oauth.application.name,
                                      uid: Settings.oauth.application.uid,
                                      redirect_uri: Settings.oauth.application.redirect_uri)
      app.owner = user
      app.save

      p app.errors
    end
  end
end
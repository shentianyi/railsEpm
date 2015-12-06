class UserService

  # require
  #  email:string
  #  password: string
  def self.sign_in params
    UserPresenter.new(if (user=User.find_for_database_authentication(email: params[:email])) && user.valid_password?(params[:password])
                                    user
                                  else
                                    nil
                                  end).as_session_json
  end


  # require
  #  email:string
  #  password: string
  #  nick_name: string
  def self.sign_up params

  end
end
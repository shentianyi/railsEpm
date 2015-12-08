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
  #  user:{
  #     email:string
  #     password: string
  #     password_confirmation: string
  #     nick_name: string
  #   }
  def self.sign_up params
    User.transaction do
      if User.find_by_email(params[:user][:email])
        {
            result_code: 0,
            messages: ['Email has already been taken']
        }
      else
        if ui=UserInvite.find_by_email(params[:user][:email])
          user=User.new(params[:user])
          user.tenant=ui.user.tenant
          ui.update_attributes(sign_uped: true) if user.save
          UserPresenter.new(user).as_sign_up_json
        else
          {
              result_code: 0,
              messages: ['You are not invited']
          }
        end
      end
    end
  end

  def self.set_password params
    if (user=User.find_for_database_authentication(id: params[:user_id])) && user.valid_password?(params[:old_password])
      # user.update_attributes(encrypted_password: params[:new_password])
      puts '11111111111111111111111111111111111'
      user.password = params[:new_password]
      user.password_confirmation = params[:new_password]
      user.save
      UserPresenter.new(user).as_set_password_json
    else
      {
          result_code: 0,
          messages: ['Old Password are not invited']
      }
    end
  end
end
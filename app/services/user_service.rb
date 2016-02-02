class UserService

  # require
  # user:{
  #      email:string,
  #     password:string}
  # }
  def self.update_basic(params, user)
    unless User.where(email:params[:email]).where("users.id<>?" ,user.id).first
      if user.update_attributes(params)
        UserPresenter.new(user).as_basic_feedback(['Set User Info Success'],1)
      else
        UserPresenter.new(user).as_basic_feedback(user.errors.full_messages, 0)
      end
    else
      ApiMessage.new(messages: ['The Email is not invalid'])
    end
  end


  # require
  #  email:string
  #  password: string
  def self.sign_in params
    UserPresenter.new(if (user=User.find_for_database_authentication(email: params[:email])) && user.valid_password?(params[:password])
                        user
                      else
                        nil
                      end).as_basic_feedback(nil,1)
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
        ApiMessage.new(result_code: 0, messages: ['Email has already been taken'])
      else
        if ui=UserInvite.find_by_email(params[:user][:email])
          user=User.new(params[:user])
          user.tenant=ui.user.tenant
          if user.save
            ui.update_attributes(sign_uped: true)
            if ui.department_id
              # TODO
              # add user to department
              unless user.user_departments.where(department_id: ui.department_id).first
                ud=user.user_departments.build
                ud.department_id=ui.department_id
                ud.save
              end
            end
            ApiMessage.new(result_code: 1, messages: ['Sign Up Success'])
          else
            ApiMessage.new(messages: user.errors.full_messages)
          end
        else
          ApiMessage.new(messages: ['You are not invited'])
        end
      end
    end
  end


  def self.set_password params, user
    if user.present?
      if params[:old_password].present?
        if (u=User.find_for_database_authentication(id: user.id)).nil? || !u.valid_password?(params[:old_password])
          return ApiMessage.new(messages: ['Incorrect Old Password'])
        end
      end

      if user.update_attributes(password: params[:new_password], password_confirmation: params[:new_password_confirmation])
        UserPresenter.new(user).as_basic_feedback(['Set Password Success'],1)
      else
        ApiMessage.new(messages: user.errors.full_messages)
      end
    else
      ApiMessage.new(messages: ["User Not Exists"])
    end
  end

  def self.forget_password email
    if User.find_by_email(email)
      ApiMessage.new(messages: ['Success! We will send you a reset password email.'], result_code: 1)
    else
      ApiMessage.new(messages: ['Your Email Account not exists'])
    end
  end


  # user is who call the method
  # user_id is the user's info
  def self.get_infos(user_id, user)
    user=user_id.blank? ? user : user.tenant.users.find_by_id(user_id)
    if user.blank?
      ApiMessage.new(messages: ['User not Found'])
    else
      UserPresenter.new(user).as_basic_info
    end
  end

  def self.update_device_info user, params
    if user.update_attributes(device_token: params[:device_token], device_type: params[:device_type], device_name: params[:device_name], device_version: params[:device_version])
      ApiMessage.new(result_code: 1, messages: ['User Devise Info Save Success'])
    else
      ApiMessage.new(messages: user.errors.full_messages)
    end
  end
end
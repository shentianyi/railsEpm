module V2
  class UserAPI < Base

    namespace :users do
      guard_all!

      get :brief_info do
        UserPresenter.new(current_user).as_brief_json
      end

    end

    namespace :user_sessions do
      guard_locale!
      # user sign in
      params do
        requires :email, type: String, desc: 'user email'
        requires :password, type: String, desc: 'user password'
      end
      post do
        UserService.sign_in(email: params[:email],
                            password: params[:password])
      end

      delete do
        guard!
        status 200
        user = User.find_by_email(current_user.email)
        user.update_attributes(last_request_at: Time.now.utc.to_s, is_online: false)
        {result_code: '1', msg: [I18n.t('devise.sessions.signed_out')]}
      end
    end

    namespace :user_registrations do
      guard_locale!
      # user sign up
      params do
        requires :email, type: String, desc: 'user email'
        requires :password, type: String, desc: 'user password'
        requires :nick_name, type: String, desc: 'user nick name'
      end
      post do
        UserService.sign_up({
                                user: {
                                    email: params[:email],
                                    password: params[:password],
                                    password_confirmation: params[:password],
                                    nick_name: params[:nick_name],
                                    role_id: Role.user
                                }
                            })
      end
    end
  end
end

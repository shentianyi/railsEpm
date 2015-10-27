module V1
  class UserAPI < Base
    namespace :user_session do

      guard_locale!

      post do
        status 200
        puts params
        user = User.find_for_database_authentication(email: params[:user_id])
        if user
          if user.valid_password?(params[:password])
            user.update_attributes(device_id: params[:device_id], is_online: true)
            {
                result_code: '1',
                token: '21dd8344ac3e0cd848b56ff41e7530c5e0fe1a5c63b3e1467e82a7b9b9c9f959',
                msg: [
                    I18n.t('devise.sessions.signed_in')
                ]
            }
          else
            {result_code: '0', msg: [I18n.t('devise.failure.invalid_password')]}
          end
        else
          {result_code: '0', msg: [I18n.t('devise.failure.invalid_email')]}
        end
      end

      delete do
        guard!
        status 200
        user = User.find_by_email(current_user.email)
        user.update_attributes(last_request_at: Time.now.utc.to_s, is_online: false)
        {result_code: '1', msg: [I18n.t('devise.sessions.signed_out')]}
      end

    end
  end
end

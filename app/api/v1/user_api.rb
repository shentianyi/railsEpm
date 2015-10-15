module V1
  class UserAPI < Base
    namespace :user_session do
      post do
        status 200
        user = User.find_for_database_authentication(email: params[:user_id])
        if user
          if user.valid_password?(params[:password])
            {
                result_code: '1',
                token: '21dd8344ac3e0cd848b56ff41e7530c5e0fe1a5c63b3e1467e82a7b9b9c9f959',
                msg: [
                    'login success'
                ]
            }
          else
            {result_code: '0', msg: ['invalid password']}
          end
        else
          {result_code: '0', msg: ['invalid email']}
        end
      end

      delete do
        status 200
      end

    end
  end
end

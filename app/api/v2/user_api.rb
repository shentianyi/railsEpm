module V2
  class UserAPI < Base

    namespace :users do
      guard_all!

      # get user list
      params do
        optional :page, type: Integer, default: 0, desc: 'page index start from 0'
        optional :size, type: Integer, default: 20, desc: 'page size'
      end
      get :brief_infos do
        jsons=[]
        current_tenant.users.offset(params[:page]*params[:size]).limit(params[:size]).each do |u|
          jsons<< UserPresenter.new(u).as_brief_info
        end
        jsons
      end

      params do
        optional :user_id, type: Integer, desc: 'user id'
      end
      get :infos do
        UserService.get_infos(params[:user_id], current_user)
      end

      # update user info
      params do
        requires :email, type: String, desc: 'user email'
        requires :nick_name, type: String, desc: 'user nick name'
      end
      put :infos do
        UserService.update_basic({email: params[:email],
                                  nick_name: params[:nick_name]}, current_user)
      end


      # set user api
      params do
        optional :old_password, type: String, desc: 'the current password'
        requires :new_password, type: String, desc: 'the new password'
        optional :user_id, type: Integer, desc: 'user id'
        optional :new_password_confirmation, type: String, desc: 'the new password confirmation'
      end
      post :set_password do
        user=params[:user_id].blank? ? current_user : User.accessible_by(current_ability).find_by_id(params[:user_id])
        params[:new_password_confirmation]=params[:new_password] if params[:new_password_confirmation].blank?

        UserService.set_password({old_password: params[:old_password],
                                  new_password: params[:new_password],
                                  new_password_confirmation: params[:new_password_confirmation]},
                                 user)
      end

      # get user departments
      params do
        optional :department_id, type: Integer, desc: 'department id'
      end
      get :departments do
        DepartmentService.user_departments(current_user, params[:department_id])
      end
    end

    namespace :users do

      # forget password
      params do
        requires :email, type: String, desc: 'user email'
      end
      post :forget_password do
        UserService.forget_password(params[:email])
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
        {result_code: 1, msg: [I18n.t('devise.sessions.signed_out')]}
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

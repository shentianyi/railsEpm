#encoding: utf-8
module Api
  class SubscriptionsController < ApiController
    def change_password
      msg=Message.new
      msg.result=false
      if current_user.valid_password?(params[:password])
        current_user.password = params[:new_password]
        current_user.password_confirmation = params[:new_password_confirmation]
        if !(msg.result = current_user.save)
          puts msg.result
          msg.content = current_user.errors.full_messages
        else
          msg.content = I18n.t "auth.msg.pwd_changed"
        end
      else
        msg.content=I18n.t "auth.msg.old_pwd_error"
      end

      render :json=>msg
    end
  end
end
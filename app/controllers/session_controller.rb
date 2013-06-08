# encoding : utf-8
class SessionController < ApplicationController
  
  skip_before_filter  :authenticate
  
  # [功能：] 用户登录。
  def create
    if user = User.authenticate( params[:user], params[:pwd] )
      session[:userId] = user.nr
      render :json => [{ :loginStatusCode=>$logOK, :authStatusCode=>$authOK }]
    else
      reset_session
      render :json => [{ :loginStatusCode=>$logFail, :authStatusCode=>$authFail }]
    end
  end

  # [功能：] 注销。
  def destroy
    reset_session
    redirect_to login_url, :notice => "已注销"
  end
  
end

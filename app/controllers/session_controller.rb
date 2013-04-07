# encoding : utf-8
class SessionController < ApplicationController
  
  # before_filter  :authenticate
  
  def create
    if user = User.authenticate( params[:user], params[:pwd] )
      session[:userId] = user.nr
      render :json => [{ :loginStatusCode=>$logOK, :authStatusCode=>$authOK }]
    else
      reset_session
      render :json => [{ :loginStatusCode=>$logFail, :authStatusCode=>$authFail }]
    end
  end

  def destroy
    reset_session
    redirect_to login_url, :notice => "已注销"
  end
  
end

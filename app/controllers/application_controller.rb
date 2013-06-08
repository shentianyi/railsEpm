class ApplicationController < ActionController::Base
  # protect_from_forgery
  before_filter  :authenticate
  
  # [功能：] 验证用户是否登录。
  def authenticate
    if session[:userId]=="epm"
      @auth_head = [{ :loginStatusCode=>$logOK, :authStatusCode=>$authOK }]
    else
      render :json => [{ :loginStatusCode=>$logFail, :authStatusCode=>$authFail }]
    end
  end
end

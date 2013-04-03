class ApplicationController < ActionController::Base
  # protect_from_forgery
  
  def authenticate
    if session[:userId]=="epm"
      @auth_head = [{ :loginStatusCode=>$loginOK, :authStatusCode=>$authOK }]
    else
      render :json => [{ :loginStatusCode=>$loginFail, :authStatusCode=>$authFail }]
    end
  end
end

class ApplicationController < ActionController::Base
  # protect_from_forgery
  before_filter  :authenticate
  
  def authenticate
    if session[:userId]=="epm"
      @auth_head = [{ :loginStatusCode=>$logOK, :authStatusCode=>$authOK }]
    else
      render :json => [{ :loginStatusCode=>$logFail, :authStatusCode=>$authFail }]
    end
  end
end

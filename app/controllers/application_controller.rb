class ApplicationController < ActionController::Base
  # protect_from_forgery
  
  def authenticate
    unless session[:userId]=="epm"
      render :json => [
        { :loginStatusCode=>$loginFail, :authStatusCode=>$authFail }
      ]
    end
  end
end

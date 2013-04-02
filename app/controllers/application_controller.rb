class ApplicationController < ActionController::Base
  # protect_from_forgery
  
  def authenticate
    unless session[:userId]=="epm"
      render :json => [
        { :loginStatusCode=>0, :authStatusCode=>0 }
      ]
    end
  end
end

class ApplicationController < ActionController::Base
  # protect_from_forgery
  
  def authenticate
    if session[:userId]=="epm"
      @auth_head = [{ :loginStatusCode=>$dteOK, :authStatusCode=>$dteOK }]
    else
      render :json => [{ :loginStatusCode=>$dteFail, :authStatusCode=>$dteFail }]
    end
  end
end

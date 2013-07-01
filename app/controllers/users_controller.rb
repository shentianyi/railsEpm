#encoding: utf-8
class UsersController < ApplicationController
  skip_before_filter :authorize,:only=>:login
  def login
    if request.post?
      if user=User.authenticate(params[:email],params[:password])
        session[:user_id]=user.id
        render :json=>{:authed=>true}
      else
        render :json => {:authed=>false}
      end
    end
  end

  def logout
  end
end

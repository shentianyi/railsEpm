#encoding: utf-8
class Admin::SessionsController < Admin::ApplicationController
  before_filter  :require_admin,:only=>[:index]
  skip_before_filter :set_model

  layout "admin_login"
  def new
      @title='Login'
    @user_session = UserSession.new
  end

 def create
    @user_session = UserSession.new(params[:user_session])
    @user=User.find_by_email(@user_session.email)
    if @user && @user.is_sys && @user_session.save
      flash[:notice] = "Login successful!"
      redirect_to admin_sessions_path
    else
      render :action => :new
    end
  end

  def destroy
    current_user_session.destroy
    flash[:notice] = "Logout successful!"
    redirect_to new_user_sessions_url
  end
  
  def destroy
    # session[:staff_id] = nil
    redirect_to login_path, :notice => "已注销"
  end

  def index
    render  :layout =>"admin_application"
  end

end

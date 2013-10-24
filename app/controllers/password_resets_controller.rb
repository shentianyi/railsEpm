class PasswordResetsController < ApplicationController
  before_filter :load_user_using_perishable_token, :only => [:edit, :update]
  skip_before_filter :require_user
  skip_before_filter :require_active_user
  skip_before_filter :check_tenant_status


  def new
    render
  end

  def edit
    render
  end

  def create
    @user = User.find_by_email(params[:email])
    if @user
      @user.deliver_user_password_reset!
      flash[:notice] = "Instructions to reset your password have been emailed to you. " +
          "Please check your email."
      redirect_to root_url
    else
      flash[:notice] = "No user was found with that email address"
      render :action => :new
    end
  end

  def update
    @user.password = params[:user][:password]
    @user.password_confirmation = params[:user][:password_confirmation]
    if @user.save
      flash[:notice] = "Password successfully updated"
      redirect_to new_session_url
    else
      render :action => :edit
    end
  end
end

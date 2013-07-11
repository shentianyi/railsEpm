class UserConfirmationsController < ApplicationController
  skip_before_filter :require_user,:only=>[:new,:create]
  skip_before_filter :require_active_user,:only=>[:new,:create]
  skip_before_filter :check_tenant_status
  before_filter :load_user_using_perishable_token, :only=>[:update]
  before_filter :require_no_user, :only=>[:new,:create,:update]
  skip_before_filter :find_current_user_tenant,:only=>[:new,:create]
  skip_authorize_resource :only=>[:new,:create]
  def edit
    @id=params[:id]
  end

  def new
    render
  end

  def create
    @user= User.find_by_email(params[:email])
    if @user
      @user.deliver_user_confirmation!
      flash[:notice]='confirmation mail has been sent to your mailbox'
      redirect_to new_user_confirmations_url
    else
      flash[:alert]='email not found'
      render :action=>'new'
    end
  end

  def update
    @user.confirmed = true
    if @user.save
      flash[:notice]='You are successfully signed up,please login again'
      redirect_to new_user_sessions_url
    else
      flash[:notice] = 'Something wrong when you finalized your registration'
      redirect_to new_user_confirmations_url
    end
  end

end

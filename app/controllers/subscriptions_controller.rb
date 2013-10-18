#encoding: utf-8
class SubscriptionsController < ApplicationController
  skip_before_filter :require_user,:only=>[:new,:create]
  skip_before_filter :require_active_user,:only=>[:new,:create]
  skip_before_filter :check_tenant_status
  skip_before_filter :find_current_user_tenant,:only=>[:new,:create]
  skip_authorize_resource :only=>[:new,:create]
  before_filter :require_no_user, :only => [:new, :create]
  before_filter :is_sign_up_allowed, :only => [:new,:create]
  layout 'non_authorized'
  def new
     @title=I18n.t 'auth.view.login_title'
    @href= '/user_sessions/new'
  end

  def is_sign_up_allowed
    if !$open_signup
      flash[:notice]="我们还没有开放注册"
      render "errors/500"
    else
    return true
    end
  end

  def create  
    @title=I18n.t 'auth.view.login_title'
    @href= '/user_sessions/new'
    begin
      raise(ArgumentError, I18n.t('auth.msg.email_token'))  if $invalid_emails.include?(params[:email])
      @user=User.new
      @user = @user.create_tenant_user!(params[:email],
                                        params[:password],
                                        params[:password_confirmation],
                                        params[:company_name])

      @user.deliver_user_confirmation!
      # flash[:notice] = 'Your account has been created.Please finish the process with the mail confirmation'
      flash[:notice] = I18n.t 'auth.msg.sign_success'
      redirect_to new_user_sessions_url#new_user_confirmations_url
    rescue ArgumentError=>invalid
      flash[:notice]=I18n.t 'auth.msg.email_token'
      render :action=>:new
    rescue ActiveRecord::RecordInvalid => invalid
      flash[:notice]=I18n.t 'auth.msg.sign_fail'
      render :action=>:new
    end
  end

end

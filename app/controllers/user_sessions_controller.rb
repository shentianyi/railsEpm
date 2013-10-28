class UserSessionsController < ApplicationController
  skip_before_filter :require_user,:only=>[:new,:create]
  skip_before_filter :require_active_user,:only=>[:new,:create]
  skip_before_filter :check_tenant_status
  skip_before_filter :find_current_user_tenant,:only=>[:new,:create]
  skip_authorize_resource :only=>[:new,:create]
  before_filter :require_no_user, :only => [:new, :create]

  layout 'non_authorized'
  def new
    #@title= I18n.t 'auth.view.sign_title'
    #@href='/subscriptions/new'
    @user_session = UserSession.new
  end

  def create
    msg=Message.new
    #@title= I18n.t 'auth.view.sign_title'
    #@href='/subscriptions/new'
    @user_session = UserSession.new(params[:user_session])
    if @user_session.save
      flash[:notice] = I18n.t 'auth.msg.login_success'
      redirect_to root_path
    else
      render :action => :new
      #msg.result=false
      #respond_to do |t|
      # t.json {render :json=>msg}
      # t.js {render :js=> jsonp_str(msg)}
      #end
    end
  end

  def destroy
    current_user_session.destroy
    flash[:notice] = I18n.t 'auth.msg.logout_success'
    redirect_to new_user_sessions_url
  end
end

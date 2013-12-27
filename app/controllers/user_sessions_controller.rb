class UserSessionsController < ApplicationController
  skip_before_filter :require_user,:only=>[:new,:create,:locale]
  skip_before_filter :require_active_user,:only=>[:new,:create,:locale]
  skip_before_filter :check_tenant_status
  skip_before_filter :find_current_user_tenant,:only=>[:new,:create,:locale]
  skip_authorize_resource :only=>[:new,:create,:locale]
  before_filter :require_no_user, :only => [:new, :create]

  layout 'non_authorized'
  def new
    @user_session = UserSession.new
  end

  def create
    msg=Message.new
    msg.result = false
    @user_session = UserSession.new(params[:user_session])
    if msg.result =  @user_session.save
      msg.result = true
      msg.content = I18n.t 'auth.msg.login_success'
    else
      msg.content = @user_session.errors.full_messages
    end
    render :json=>msg
  end

  def destroy
    current_user_session.destroy
    flash[:notice] = I18n.t 'auth.msg.logout_success'
    redirect_to new_user_sessions_url
  end


  def finish_guide
    result = {:result=>true}
    current_user.remove_guide_item(params[:cname],params[:aname])
    respond_to do |t|
      t.json {render :json=>result}
      t.js {render :js=>jsonp_str(result)}
    end
  end

  def locale
    msg = Message.new
    msg.result = true
    cookies[:locale] = params[:locale]
    msg.content = session[:return_to]
    puts session[:return_to]
    render :json => msg
  end
end

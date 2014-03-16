class UserSessionsController < Devise::SessionsController

  skip_before_filter :require_user,:only=>[:new,:create,:locale]
  skip_before_filter :require_active_user,:only=>[:new,:create,:locale]
  skip_before_filter :check_tenant_status
  skip_before_filter :find_current_user_tenant,:only=>[:new,:create,:locale]
  skip_authorize_resource :only=>[:new,:create,:locale]
  before_filter :require_no_user, :only => [:new, :create]

  layout 'non_authorized'
  #def new
  #  @user_session = UserSession.new
  #end

  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message(:notice, :signed_in) if is_flashing_format?
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with resource, location: after_sign_in_path_for(resource)
  end
  #def create
  #  msg=Message.new
  #  msg.result = false
  #  @user_session = UserSession.new(params[:user_session])
  #  if msg.result =  @user_session.save
  #    msg.result = true
  #    msg.content = I18n.t 'auth.msg.login_success'
  #  else
  #    msg.content = @user_session.errors.full_messages
  #  end
  #  render :json=>msg
  #end

  def destroy
    #current_user_session.destroy
    Devise.sign_out_all_scopes
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
    render :json => msg
  end
end

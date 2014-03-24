class UserSessionsController < Devise::SessionsController
  skip_before_filter :require_user, :only => [:new, :create, :locale]
  skip_before_filter :check_tenant_status
  skip_before_filter :find_current_user_tenant
  #before_filter :ensure_params_exist, :only => [:create]
  skip_authorize_resource

  layout 'non_authorized'

  def create
    params[:user] = params[:user_session] if params[:user_sesison]
    resource = User.find_for_database_authentication(:email => params[:user][:email])
    return invalid_login_attempt unless resource
    if resource.valid_password?(params[:user][:password])
      sign_in(resource_name, resource)
      render :json => {result: true,
                       content: I18n.t('auth.msg.login_success')}
      return
    end
    invalid_login_attempt
  end

  def destroy
    redirect_path = after_sign_out_path_for(resource_name)
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message :notice, :signed_out if signed_out && is_flashing_format?
    yield resource if block_given?

    respond_to do |format|
      format.json { render :json => {:result => true} }
      format.html { redirect_to redirect_path }
    end
  end


  def finish_guide
    result = {:result => true}
    current_user.remove_guide_item(params[:cname], params[:aname])
    respond_to do |t|
      t.json { render :json => result }
      t.js { render :js => jsonp_str(result) }
    end
  end

  def locale
    msg = Message.new(result: true)
    cookies[:locale] = params[:locale]
    msg.content = session[:return_to]
    render :json => msg
  end


  protected
  def ensure_params_exist
    return unless params[:user].blank?
    render :json => {:success => false, :message => "missing user_login parameter"}, :status => 422
  end

  def invalid_login_attempt
    warden.custom_failure!
    render :json => {:result => false, :content => I18n.t('auth.msg.login_fail')}
  end
end

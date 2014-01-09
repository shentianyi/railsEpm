#encoding: utf-8
class ApplicationController < ActionController::Base
  # begin includes
  include ApplicationHelper
  
  # end includes
  protect_from_forgery
  helper :all
  helper_method :current_user_session, :current_user
  before_filter :require_user
  before_filter :require_active_user
  before_filter :find_current_user_tenant
  #
  before_filter :check_tenant_status
  
  # I18n
  before_filter :store_location
  before_filter  :set_locale
  #
  #
  set_current_tenant_through_filter
  ###before_filter :authorize
  #
  authorize_resource


  private
  #def authorize
  #  unless @current_user=User.find_by_id(session[:user_id])
  #    render :json=>{:auth=>false}
  #  end
  #end

 def find_current_user_tenant
   current_tenant=Tenant.find_by_id(current_user.tenant_id)
   set_current_tenant(current_tenant)
 end

  # set cancan Ability
  def current_ability
    @current_ability||=Ability.new(current_user)
  end



  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end


  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end


  def current_user_tenant
    return @current_user_tenant if defined?(@current_user_tenant)
    @current_user_tenant = Tenant.find current_user.tenant_id
  end


  def store_location
    session[:return_to] = request.fullpath
  end


  def redirect_back_or_default(default)
    redirect_to(session[:return_to] || default)
    session[:return_to] = nil
  end


  def render_internal_error_page
    render :template => '/errors/500'
  end


  def edition_resource_limit(edition,resource_name)
    limit = -1

    if ($tenant_editions.has_key?(edition) &&
        $tenant_editions[edition].has_key?(:limits) &&
        $tenant_editions[edition][:limits].has_key?(resource_name.downcase.to_sym))

      limit= $tenant_editions[edition][:limits][resource_name.downcase.to_sym]

    end
    return limit
  end



  def count_tenant_resource (controller)
    return controller.classify.constantize.where(tenant_id= current_user.tenant_id).count()
  end



  #filter methods begin

  #need login
  def require_user
    unless current_user
      respond_to do |format|
     format.json {     render json: {access:false,loginStatusCode:-3000,authStatusCode:-4000} ,status: 403}
      format.html { redirect_to new_user_sessions_url }
    end
    end
  end

  #can't be login
  def require_no_user
    if current_user
      store_location
      flash[:alert] =  I18n.t 'auth.msg.logout_require'
      #redirect_to root_url
      redirect_to welcome_url
      return false
    end
  end

  #must be login and active
  def require_active_user
    unless current_user && current_user.status == UserStatus::ACTIVE
      flash[:alert]= I18n.t 'auth.msg.lock_account'
      current_user_session.destroy
      redirect_to new_user_sessions_url
      return false
    end
  end


  def load_user_using_perishable_token
    @user = User.find_using_perishable_token(params[:id])
    unless @user
      flash[:alert] = "We're sorry, but we could not locate your account. " +
          "If you are having issues try copying and pasting the URL " +
          "from your email into your browser or restarting the " +
          "reset password process."
      redirect_to new_user_confirmations_url
    end
  end

  #check resource limitation
  def check_tenant_resource_limitation
    store_location
    count = count_tenant_resource controller_name
    tenant = Tenant.find(current_user_tenant.id)
    limit = edition_resource_limit tenant.edition,controller_name.classify
    unless limit< 0 || count<limit
      flash[:alert]= 'The resource you created has reached ' +
          'the limitation of your subscription. You may upgrade your plan'
      redirect_to billing_url
    end
  end


  #check tenant status
  def check_tenant_status
    unless (current_user_tenant.subscription_status ==SubscriptionStatus::TRIAL ||
        current_user_tenant.subscription_status ==SubscriptionStatus::ACTIVE) &&
        current_user_tenant.expire_at.to_time.utc >= Time.now.utc
      case current_user_tenant.subscription_status
        when SubscriptionStatus::EXPIRED #expired
          flash[:alert]='You account has been expired.' +
              'If you have renewed, please get contact with our service'
          redirect_to billing_url
        when SubscriptionStatus::TRIAL #Expired
          flash[:alert]='You account has been locked.'  +
              ' If you have renewed, please get contact with our service'
          redirect_to billing_url
        when SubscriptionStatus::LOCKED #Locked
          render_internal_error_page
        else
          flash[:alert] = 'Something wrong with your account. Please contact the service'
          render_internal_error_page
      end
    end
  end

  def check_tenant_function
    unless($tenant_editions[current_user_tenant.edition][:functions].include?("#{params[:controller]}##{params[:action]}"))
      store_location
      flash[:alert]='Your edition does not support the function, you may upgrade your plan'
      redirect_back_or_default billing_url
         return false
    end
  end
  #filter methods end

  def billing_url

  end

  rescue_from CanCan::AccessDenied do |exception|
     # render :json=>{:access=>false},:status => 403
     error_page_403
      # render :file => "#{Rails.root}/public/403.html", :status => 403, :layout => false
  end
 
  # I18n
  def set_locale
    I18n.locale=cookies[:locale] || extract_locale_from_accept_language_header || I18n.default_locale
  end
  
  private
  def extract_locale_from_accept_language_header
     request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first if request.env['HTTP_ACCEPT_LANGUAGE']
  end
  
    def error_page_403
    respond_to do |format|
      format.html {render :file => File.join(Rails.root, 'public/403.html'), :status => 403, :layout => false}
      format.json { render json: {access:false,loginStatusCode:-2999,authStatusCode:-4000} ,status: 403}
    end
  end

  def error_page_404
    respond_to do |format|
      format.html {render :file => File.join(Rails.root, 'public/404.html'), :status => 404, :layout => false}
      format.json { render json: {access:false} ,status: 404 }
    end
  end
  
end

# module SubscriptionStatus
  # TRIAL = 0
  # ACTIVE = 1
  # EXPIRED = 2
  # LOCKED =3
# end
#
# module UserStatus
  # ACTIVE=0
  # LOCKED=1
# end


def jsonp_str(obj)
  str=''
  str =obj.to_json.to_s if obj
  return params[:callback]?params[:callback]+'('+ str +')':''+'('+ str +')'
end

def new_message
  return {:return=>false,:errors=>[], :id=>nil}
end



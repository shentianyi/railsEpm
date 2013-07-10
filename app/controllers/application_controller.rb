#encoding: utf-8
class ApplicationController < ActionController::Base
  #  include UrlHelper
  helper :all
  helper_method :current_user_session, :current_user
  before_filter :require_user
  before_filter :require_active_user
  before_filter :check_tenant_status


  #set_current_tenant_through_filter
  ##before_filter :authorize
  ##before_filter :find_current_user_tenant
  #authorize_resource
  # protect_from_forgery

  private
  #def authorize
  #  unless @current_user=User.find_by_id(session[:user_id])
  #    render :json=>{:auth=>false}
  #  end
  #end

  #def find_current_user_tenant
  #  current_tenant=Tenant.find_by_id(@current_user.tenant_id)
  #  set_current_tenant(current_tenant)
  #end

  # set cancan Ability
  def current_ability
    @current_ability||=Ability.new(@current_user)
  end



  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end


  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end


  def current_tenant
    return @current_tenant if defined?(@current_tenant)
    @current_tenant = Tenant.find current_user.tenant_id
  end


  def store_location
    session[:return_to] = request.fullpath
  end


  def redirect_back_or_default(default)
    a = session[:return_to]
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
      store_location
      flash[:notice] = "You must be logged in to access this page"
      redirect_to new_user_sessions_url
      return false
    end
  end

  #can't be login
  def require_no_user
    if current_user
      store_location
      flash[:notice] = "You must be logged out to access this page"
      redirect_to root_url
      return false
    end
  end

  #must be login and active
  def require_active_user
    unless current_user && current_user.status == User_status::ACTIVE
      flash[:notice]="Your user account is locked, if it's your new account, " +
          "please finish your registration with our confirmation letter"
      current_user_session.destroy
      redirect_to new_user_sessions_url
      return false
    end
  end


  def load_user_using_perishable_token
    @user = User.find_using_perishable_token(params[:id])
    unless @user
      flash[:notice] = "We're sorry, but we could not locate your account. " +
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
    tenant = Tenant.find(current_tenant.id)
    limit = edition_resource_limit tenant.edition,controller_name.classify
    unless limit< 0 || count<limit
      flash[:notice]= 'The resource you created has reached ' +
          'the limitation of your subscription. You may upgrade your plan'
      redirect_to billing_url
    end
  end


  #check tenant status
  def check_tenant_status
    unless (current_tenant.subscription_status ==Subscription_status::TRIAL ||
        current_tenant.subscription_status ==Subscription_status::ACTIVE) &&
        current_tenant.expire_at.to_time.utc >= Time.now.utc
      case current_tenant.subscription_status
        when Subscription_status::EXPIRED #expired
          flash[:notice]='You account has been expired.' +
              'If you have renewed, please get contact with our service'
          redirect_to billing_url
        when Subscription_status::TRIAL #Expired
          flash[:notice]='You account has been locked.'  +
              ' If you have renewed, please get contact with our service'
          redirect_to billing_url
        when Subscription_status::LOCKED #Locked
          render_internal_error_page
        else
          flash[:notice] = 'Something wrong with your account. Please contact the service'
          render_internal_error_page
      end
    end
  end

  def check_tenant_function
    unless($tenant_editions[current_tenant.edition][:functions].include?("#{params[:controller]}##{params[:action]}"))
      store_location
      flash[:notice]='Your edition does not support the function, you may upgrade your plan'
      redirect_back_or_default billing_url
         return false
    end
  end
  #filter methods end





  def billing_url

  end


end

module Subscription_status
  TRIAL = 0
  ACTIVE = 1
  EXPIRED = 2
  LOCKED =3
end

module User_status
  ACTIVE=0
  LOCKED=1
end






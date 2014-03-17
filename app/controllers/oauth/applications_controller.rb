class Oauth::ApplicationsController < Doorkeeper::ApplicationsController
  include ApplicationHelper

  before_filter :authenticate_user!
  before_filter :require_user_as_admin
  #before_filter :authenticate_resource_owner!
  def index
    @applications = current_user.tenant.oauth_applications
  end

  # only needed if each application must have some owner
  def create
    params[:application][:redirect_uri]=default_url if application_params[:redirect_uri].blank?
    @application = Doorkeeper::Application.new(application_params)
    @application.owner = current_user.tenant if Doorkeeper.configuration.confirm_application_owner?

    if @application.save
      flash[:notice] = I18n.t(:notice, :scope => [:doorkeeper, :flash, :applications, :create])
      respond_with [:oauth, @application]
    else
      render :new
    end
  end

  private
  def default_url
    'http://cz-tek.com:8000'
  end
end
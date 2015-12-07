class Oauth::ApplicationsController < Doorkeeper::ApplicationsController
  include ApplicationHelper
  include ErrorHelper
  before_filter :authenticate_user!
  before_filter :require_user_as_admin
  before_filter :authenticate_resource_owner!

  def index
    @applications = current_user.oauth_applications
    #grants=@applications[0].access_grants
    #puts grants
    #
    #access_token = Doorkeeper::AccessToken.create!(:application_id => @applications[0].id, :resource_owner_id => current_user.tenant.id)
    #puts access_token
  end

  # only needed if each application must have some owner
  def create
    params[:application][:redirect_uri]=default_url if application_params[:redirect_uri].blank?
    @application = Doorkeeper::Application.new(application_params)
    @application.owner = current_user#.tenant if Doorkeeper.configuration.confirm_application_owner?

    if @application.save
      Doorkeeper::AccessToken.create!(application_id: @application.id,
                                      resource_owner_id: current_user.tenant.id,
                                      expires_in: Doorkeeper.configuration.access_token_expires_in) if @application.access_tokens.count==0

      flash[:notice] = I18n.t(:notice, :scope => [:doorkeeper, :flash, :applications, :create])
      respond_with [:oauth, @application]
    else
      render :new
    end
  end

  def show
    if @token=@application.access_tokens.first
      @token=@token.token
    end
  end

  private
  def default_url
    'http://cz-tek.com:8000'
  end
end
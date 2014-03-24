class Admin::TenantsController < Admin::ApplicationController
  def index
    @tenants=Tenant.all
    respond_to do |format|
      format.html
      format.json { render json: @tenants }
    end
  end

  def new
    @tenant = Tenant.new

    respond_to do |format|
      format.html # new.html.erb
    end
  end



  def create
    begin
      @user=User.new
      @user.status=0
      @user.create_tenant_user!(params[:user][:email], params[:user][:password], params[:user][:password], params[:tenant][:company_name])
      @tenant=@user.tenant
      redirect_to @tenant, notice: 'Tenant was successfully created.'
    rescue Exception => e
      render action: "new", notice: "created error: #{e.message}"
    end
  end
end

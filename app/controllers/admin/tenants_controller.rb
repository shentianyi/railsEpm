class Admin::TenantsController < Admin::ApplicationController
  def index
    @tenants=Tenant.all
    respond_to do |format|
      format.html
      format.json { render json: @tenants }
    end
  end

  def show
    @tenant = Tenant.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
    end
  end

  def new
    @tenant = Tenant.new

    respond_to do |format|
      format.html # new.html.erb
    end
  end


  def edit
    @tenant=Tenant.find(params[:id])
  end

  def create
    begin
      @user=User.new
      @user.status=0
      @user.first_name=params[:user][:first_name]
      @user.create_tenant_user!(params[:user][:email], params[:user][:password], params[:user][:password], params[:tenant][:company_name])
      @tenant=@user.tenant
      redirect_to  [:admin,@tenant], notice: 'Tenant was successfully created.'
    rescue Exception => e
      render action: "new", notice: "created error: #{e.message}"
    end
  end

  def update
    @tenant=Tenant.find(params[:id])

    respond_to do |format|
      if @tenant.update_attributes(params[:tenant])
        format.html { redirect_to [:admin,@tenant], notice: 'Tenant was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @tenant.errors, status: :unprocessable_entity }
      end
    end
  end
end

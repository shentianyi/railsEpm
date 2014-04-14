class KpiPropertiesController < ApplicationController
  #before_filter :require_user_as_admin, :only=>[:index,:create]
  skip_before_filter :verify_authenticity_token
  before_filter :require_user_as_admin

  # GET /kpi_properties
  # GET /kpi_properties.json
  def index
    @kpi_properties = KpiProperty.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @kpi_properties }
    end
  end

  # GET /kpi_properties/1
  # GET /kpi_properties/1.json
  def show
    @kpi_property = KpiProperty.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @kpi_property }
    end
  end

  # GET /kpi_properties/new
  # GET /kpi_properties/new.json
  def new
    @kpi_property = KpiProperty.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @kpi_property }
    end
  end

  # GET /kpi_properties/1/edit
  def edit
    @kpi_property = KpiProperty.find(params[:id])
  end

  # POST /kpi_properties
  # POST /kpi_properties.json
  def create
    @kpi_property = KpiProperty.new(params[:kpi_property])
    @kpi_property.user = current_user
    @kpi_property.tenant = current_tenant

    respond_to do |format|
      if @kpi_property.save
        format.html { redirect_to @kpi_property, notice: 'Kpi property was successfully created.' }
        format.json { render json: @kpi_property, status: :created, location: @kpi_property }
      else
        format.html { render action: "new" }
        format.json { render json: @kpi_property.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /kpi_properties/1
  # PUT /kpi_properties/1.json
  def update
    @kpi_property = KpiProperty.find(params[:id])

    respond_to do |format|
      if @kpi_property.update_attributes(params[:kpi_property])
        format.html { redirect_to @kpi_property, notice: 'Kpi property was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @kpi_property.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /kpi_properties/1
  # DELETE /kpi_properties/1.json
  def destroy
    @kpi_property = KpiProperty.find(params[:id])
    @kpi_property.destroy

    respond_to do |format|
      format.html { redirect_to kpi_properties_url }
      format.json { head :no_content }
    end
  end
end

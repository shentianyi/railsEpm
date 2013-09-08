#encoding: utf-8
class Admin::KpiTemplatesController < Admin::ApplicationController
  
  # GET /admin/kpi_templates
  # GET /admin/kpi_templates.json
  def index
    @admin_kpi_templates = Admin::KpiTemplate.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @admin_kpi_templates }
    end
  end

  # GET /admin/kpi_templates/1
  # GET /admin/kpi_templates/1.json
  def show
    @admin_kpi_template = Admin::KpiTemplate.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @admin_kpi_template }
    end
  end

  # GET /admin/kpi_templates/new
  # GET /admin/kpi_templates/new.json
  def new
    @admin_kpi_template = Admin::KpiTemplate.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @admin_kpi_template }
    end
  end

  # GET /admin/kpi_templates/1/edit
  def edit
    @admin_kpi_template = Admin::KpiTemplate.find(params[:id])
  end

  # POST /admin/kpi_templates
  # POST /admin/kpi_templates.json
  def create
    @admin_kpi_template = Admin::KpiTemplate.new(params[:admin_kpi_template])

    respond_to do |format|
      if @admin_kpi_template.save
        format.html { redirect_to @admin_kpi_template, notice: 'Kpi template was successfully created.' }
        format.json { render json: @admin_kpi_template, status: :created, location: @admin_kpi_template }
      else
        format.html { render action: "new" }
        format.json { render json: @admin_kpi_template.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /admin/kpi_templates/1
  # PUT /admin/kpi_templates/1.json
  def update
    @admin_kpi_template = Admin::KpiTemplate.find(params[:id])

    respond_to do |format|
      if @admin_kpi_template.update_attributes(params[:admin_kpi_template])
        format.html { redirect_to @admin_kpi_template, notice: 'Kpi template was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @admin_kpi_template.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/kpi_templates/1
  # DELETE /admin/kpi_templates/1.json
  def destroy
    @admin_kpi_template = Admin::KpiTemplate.find(params[:id])
    @admin_kpi_template.destroy

    respond_to do |format|
      format.html { redirect_to admin_kpi_templates_url }
      format.json { head :no_content }
    end
  end
  
  def updata
    
  end
end

#encoding: utf-8
class Admin::KpiCategoryTemplatesController < Admin::ApplicationController
  # GET /admin/kpi_category_templates
  # GET /admin/kpi_category_templates.json
  def index
    @admin_kpi_category_templates = Admin::KpiCategoryTemplate.paginate(:page=>params[:page],:per_page=>20)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @admin_kpi_category_templates }
    end
  end

  # GET /admin/kpi_category_templates/1
  # GET /admin/kpi_category_templates/1.json
  def show
    @admin_kpi_category_template = Admin::KpiCategoryTemplate.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @admin_kpi_category_template }
    end
  end

  # GET /admin/kpi_category_templates/new
  # GET /admin/kpi_category_templates/new.json
  def new
    @admin_kpi_category_template = Admin::KpiCategoryTemplate.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @admin_kpi_category_template }
    end
  end

  # GET /admin/kpi_category_templates/1/edit
  def edit
    @admin_kpi_category_template = Admin::KpiCategoryTemplate.find(params[:id])
  end

  # POST /admin/kpi_category_templates
  # POST /admin/kpi_category_templates.json
  def create
    @admin_kpi_category_template = Admin::KpiCategoryTemplate.new(params[:admin_kpi_category_template])

    respond_to do |format|
      if @admin_kpi_category_template.save
        format.html { redirect_to @admin_kpi_category_template, notice: 'Kpi category template was successfully created.' }
        format.json { render json: @admin_kpi_category_template, status: :created, location: @admin_kpi_category_template }
      else
        format.html { render action: "new" }
        format.json { render json: @admin_kpi_category_template.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /admin/kpi_category_templates/1
  # PUT /admin/kpi_category_templates/1.json
  def update
    @admin_kpi_category_template = Admin::KpiCategoryTemplate.find(params[:id])

    respond_to do |format|
      if @admin_kpi_category_template.update_attributes(params[:admin_kpi_category_template])
        format.html { redirect_to @admin_kpi_category_template, notice: 'Kpi category template was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @admin_kpi_category_template.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/kpi_category_templates/1
  # DELETE /admin/kpi_category_templates/1.json
  def destroy
    @admin_kpi_category_template = Admin::KpiCategoryTemplate.find(params[:id])
    @admin_kpi_category_template.destroy

    respond_to do |format|
      format.html { redirect_to admin_kpi_category_templates_url }
      format.json { head :no_content }
    end
  end 
  
  def updata 
      super {|data,query,row,row_line|
        raise(ArgumentError,"行:#{row_line}, Name 不能为空值") if row["Name"].nil?
        data["name"]=row["Name"]
        data["description"]=row["Description"]
        query["name"]=row["Name"]   if query
      } 
  end
  
end

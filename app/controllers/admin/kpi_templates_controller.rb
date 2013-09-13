#encoding: utf-8
class Admin::KpiTemplatesController < Admin::ApplicationController
  before_filter :get_conditions,:only=>[:new,:edit]
  # GET /admin/kpi_templates
  # GET /admin/kpi_templates.json
  def index
    @admin_kpi_templates = Admin::KpiTemplate.paginate(:page=>params[:page],:per_page=>20)
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
    super {|data,query,row,row_line|
      if row["Name"].nil? || row["IsCalculated"].nil? || row["Frequency"].nil? || row["Direction"].nil? || row["Target"].nil? || row["Unit"].nil? || row["KpiCategory"].nil?
        raise(ArgumentError,"行:#{row_line}, Name, IsCalculated, Frequency, Direction, Target, Unit, KpiCategory 不能为空值")
      end

      if !row["IsCalculated"].nil? && row["IsCalculated"].to_i==1 && row["Formula"].nil?
        raise(ArgumentError,"行:#{row_line}, Formula 不能为空值");
      else
        data["formula_string"]=row["Formula"]
      end
      if kpi_category=Admin::KpiCategoryTemplate.find_by_name(row["KpiCategory"])
        data["admin_kpi_category_template_id"]=kpi_category.id
      else
        raise(ArgumentError,"行:#{row_line}, KpiCategory 不存在")
      end
      data["name"]=row["Name"]
      data["description"]=row["Description"]
      data["is_calculated"]=row["IsCalculated"]
      data["frequency"]=row["Frequency"]
      data["direction"]=row["Direction"]
      data["target"]=row["Target"]
      data["unit"]=row["Unit"]
      if query
        query["name"]=data["name"]
        query["admin_kpi_category_template_id"]= data["admin_kpi_category_template_id"]
      end
    }
  end

  def categoried
    @admin_kpi_templates= if category=Admin::KpiCategoryTemplate.find(params[:id])
          category.admin_kpi_templates.paginate(:page=>params[:page],:per_page=>20)
        else
          []
    end
    render 'index'
  end

  
  private

  def get_conditions
    @units=KpiUnit.all
    @frequencies=KpiFrequency.all
    @directions=KpiDirection.all
    @categories= Admin::KpiCategoryTemplate.all
  end
end

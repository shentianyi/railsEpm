class Admin::KpiCategoryTemplatesController < Admin::ApplicationController
  # GET /admin/kpi_category_templates
  # GET /admin/kpi_category_templates.json
  def index
    @admin_kpi_category_templates = Admin::KpiCategoryTemplate.all

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
     def updata
    super {|data,query,row,row_line|
      raise(ArgumentError,"行:#{row_line}, PartNr/ UnitTime 不能为空值") if row["PartNr"].nil? or row["UnitTime"].nil?
      data["partNr"]=row["PartNr"]
      data["name"]=row["Name"] if row["Name"]
      data["clientPartNr"]=row["ClientPartNr"] if row["ClientPartNr"]
      data["orderNr"]=row["OrderNr"] if row["OrderNr"]
      data["unitTime"]=row["UnitTime"] if row["UnitTime"]
      if row["EntityNr"]
        if entity=Entity.find_by(:entityNr=>row["EntityNr"])
          data["entity_id"]=entity.id
        end
      end
      query["partNr"]=row["PartNr"]   if query
    }
  end

  end
end

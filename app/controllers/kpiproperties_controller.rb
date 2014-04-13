class KpipropertiesController < ApplicationController
  # GET /kpiproperties
  # GET /kpiproperties.json
  def index
    @kpiproperties = Kpiproperty.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @kpiproperties }
    end
  end

  # GET /kpiproperties/1
  # GET /kpiproperties/1.json
  def show
    @kpiproperty = Kpiproperty.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @kpiproperty }
    end
  end

  # GET /kpiproperties/new
  # GET /kpiproperties/new.json
  def new
    @kpiproperty = Kpiproperty.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @kpiproperty }
    end
  end

  # GET /kpiproperties/1/edit
  def edit
    @kpiproperty = Kpiproperty.find(params[:id])
  end

  # POST /kpiproperties
  # POST /kpiproperties.json
  def create
    @kpiproperty = Kpiproperty.new(params[:kpiproperty])

    respond_to do |format|
      if @kpiproperty.save
        format.html { redirect_to @kpiproperty, notice: 'Kpiproperty was successfully created.' }
        format.json { render json: @kpiproperty, status: :created, location: @kpiproperty }
      else
        format.html { render action: "new" }
        format.json { render json: @kpiproperty.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /kpiproperties/1
  # PUT /kpiproperties/1.json
  def update
    @kpiproperty = Kpiproperty.find(params[:id])

    respond_to do |format|
      if @kpiproperty.update_attributes(params[:kpiproperty])
        format.html { redirect_to @kpiproperty, notice: 'Kpiproperty was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @kpiproperty.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /kpiproperties/1
  # DELETE /kpiproperties/1.json
  def destroy
    @kpiproperty = Kpiproperty.find(params[:id])
    @kpiproperty.destroy

    respond_to do |format|
      format.html { redirect_to kpiproperties_url }
      format.json { head :no_content }
    end
  end
end

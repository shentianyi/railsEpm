class KpiSubscribesController < ApplicationController
  # GET /kpi_subscribes
  # GET /kpi_subscribes.json
  def index
    @kpi_subscribes = KpiSubscribe.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @kpi_subscribes }
    end
  end

  # GET /kpi_subscribes/1
  # GET /kpi_subscribes/1.json
  def show
    @kpi_subscribe = KpiSubscribe.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @kpi_subscribe }
    end
  end

  # GET /kpi_subscribes/new
  # GET /kpi_subscribes/new.json
  def new
    @kpi_subscribe = KpiSubscribe.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @kpi_subscribe }
    end
  end

  # GET /kpi_subscribes/1/edit
  def edit
    @kpi_subscribe = KpiSubscribe.find(params[:id])
  end

  # POST /kpi_subscribes
  # POST /kpi_subscribes.json
  def create
    @kpi_subscribe = KpiSubscribe.new(params[:kpi_subscribe])

    respond_to do |format|
      if @kpi_subscribe.save
        format.html { redirect_to @kpi_subscribe, notice: 'Kpi subscribe was successfully created.' }
        format.json { render json: @kpi_subscribe, status: :created, location: @kpi_subscribe }
      else
        format.html { render action: "new" }
        format.json { render json: @kpi_subscribe.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /kpi_subscribes/1
  # PUT /kpi_subscribes/1.json
  def update
    @kpi_subscribe = KpiSubscribe.find(params[:id])

    respond_to do |format|
      if @kpi_subscribe.update_attributes(params[:kpi_subscribe])
        format.html { redirect_to @kpi_subscribe, notice: 'Kpi subscribe was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @kpi_subscribe.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /kpi_subscribes/1
  # DELETE /kpi_subscribes/1.json
  def destroy
    @kpi_subscribe = KpiSubscribe.find(params[:id])
    @kpi_subscribe.destroy

    respond_to do |format|
      format.html { redirect_to kpi_subscribes_url }
      format.json { head :no_content }
    end
  end
end

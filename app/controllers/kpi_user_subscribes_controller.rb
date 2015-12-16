class KpiUserSubscribesController < ApplicationController
  # GET /kpi_user_subscribes
  # GET /kpi_user_subscribes.json
  def index
    @kpi_user_subscribes = KpiUserSubscribe.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @kpi_user_subscribes }
    end
  end

  # GET /kpi_user_subscribes/1
  # GET /kpi_user_subscribes/1.json
  def show
    @kpi_user_subscribe = KpiUserSubscribe.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @kpi_user_subscribe }
    end
  end

  # GET /kpi_user_subscribes/new
  # GET /kpi_user_subscribes/new.json
  def new
    @kpi_user_subscribe = KpiUserSubscribe.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @kpi_user_subscribe }
    end
  end

  # GET /kpi_user_subscribes/1/edit
  def edit
    @kpi_user_subscribe = KpiUserSubscribe.find(params[:id])
  end

  # POST /kpi_user_subscribes
  # POST /kpi_user_subscribes.json
  def create
    @kpi_user_subscribe = KpiUserSubscribe.new(params[:kpi_user_subscribe])

    respond_to do |format|
      if @kpi_user_subscribe.save
        format.html { redirect_to @kpi_user_subscribe, notice: 'Kpi user subscribe was successfully created.' }
        format.json { render json: @kpi_user_subscribe, status: :created, location: @kpi_user_subscribe }
      else
        format.html { render action: "new" }
        format.json { render json: @kpi_user_subscribe.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /kpi_user_subscribes/1
  # PUT /kpi_user_subscribes/1.json
  def update
    @kpi_user_subscribe = KpiUserSubscribe.find(params[:id])

    respond_to do |format|
      if @kpi_user_subscribe.update_attributes(params[:kpi_user_subscribe])
        format.html { redirect_to @kpi_user_subscribe, notice: 'Kpi user subscribe was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @kpi_user_subscribe.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /kpi_user_subscribes/1
  # DELETE /kpi_user_subscribes/1.json
  def destroy
    @kpi_user_subscribe = KpiUserSubscribe.find(params[:id])
    @kpi_user_subscribe.destroy

    respond_to do |format|
      format.html { redirect_to kpi_user_subscribes_url }
      format.json { head :no_content }
    end
  end
end

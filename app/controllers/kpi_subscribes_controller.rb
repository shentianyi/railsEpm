class KpiSubscribesController < ApplicationController
  before_filter :get_ability_category,:get_kpis_by_category,:get_user_entity_groups, :only => [:index,:new,:mine]
  # GET /kpi_subscribes
  # GET /kpi_subscribes.json
  def index
    @active_category_id= params[:id].nil? ? (@categories.length>0 ? @categories[0].id : nil) : params[:id].to_i
    get_kpis_by_category(@active_category_id) if @active_category_id

    @kpi_subscribes = current_user.kpi_subscribes

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
    @kpi_subscribe.user = current_user
    @kpi_subscribe.tenant = current_tenant
    #create chart condition
    @chart_condition = ChartCondition.new(params[:chart_condition])
    @kpi_subscribe.chart_condition = @chart_condition
    #create alert
    alerts = []
    params[:subscribe_alerts].each do |index,alert|
      alerts << KpiSubscribeAlert.new(alert)
    end
    @kpi_subscribe.kpi_subscribe_alerts = alerts
    #
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

  def mine
    @active_category_id= params[:id].nil? ? (@categories.length>0 ? @categories[0].id : nil) : params[:id].to_i
    get_kpis_by_category(@active_category_id) if @active_category_id
    puts "##############################"
    puts @active_category_id
    respond_to do |format|
      format.html # mine.html.erb
      format.json { render json: @kpis }
    end
  end

  def my_subscribe
    get_kpis_by_category params[:id]
    render :partial => 'subscribes'
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

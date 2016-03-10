class ProductionPlansController < ApplicationController


  before_filter :require_user_as_admin, :only => :index

  # GET /production_plans
  # GET /production_plans.json
  def index
    @production_plans = ProductionPlan.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @production_plans }
    end
  end

  # GET /production_plans/1
  # GET /production_plans/1.json
  def show
    @production_plan = ProductionPlan.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @production_plan }
    end
  end

  # GET /production_plans/new
  # GET /production_plans/new.json
  def new
    @production_plan = ProductionPlan.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @production_plan }
    end
  end

  # GET /production_plans/1/edit
  def edit
    @production_plan = ProductionPlan.find(params[:id])
  end

  # POST /production_plans
  # POST /production_plans.json
  def create
    @production_plan = ProductionPlan.new(params[:production_plan])
    @production_plan.date=(@production_plan.date-8.hours).utc
    @production_plan.user=current_user
    respond_to do |format|
      if @production_plan.save
        format.html { redirect_to @production_plan, notice: 'Production plan was successfully created.' }
        format.json { render json: @production_plan, status: :created, location: @production_plan }
      else
        format.html { render action: "new" }
        format.json { render json: @production_plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /production_plans/1
  # PUT /production_plans/1.json
  def update
    @production_plan = ProductionPlan.find(params[:id])
    @production_plan.user=current_user

    respond_to do |format|

      if @production_plan.update_attributes(params[:production_plan])
        format.html { redirect_to @production_plan, notice: 'Production plan was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @production_plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /production_plans/1
  # DELETE /production_plans/1.json
  def destroy
    @production_plan = ProductionPlan.find(params[:id])
    @production_plan.destroy

    respond_to do |format|
      format.html { redirect_to production_plans_url }
      format.json { head :no_content }
    end
  end
end

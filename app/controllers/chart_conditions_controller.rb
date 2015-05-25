class ChartConditionsController < ApplicationController
  # GET /chart_conditions
  # GET /chart_conditions.json
  def index
    @chart_conditions = ChartCondition.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @chart_conditions }
    end
  end

  # GET /chart_conditions/1
  # GET /chart_conditions/1.json
  def show
    @chart_condition = ChartCondition.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @chart_condition }
    end
  end

  # GET /chart_conditions/new
  # GET /chart_conditions/new.json
  def new
    @chart_condition = ChartCondition.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @chart_condition }
    end
  end

  # GET /chart_conditions/1/edit
  def edit
    @chart_condition = ChartCondition.find(params[:id])
  end

  # POST /chart_conditions
  # POST /chart_conditions.json
  def create
    @chart_condition = ChartCondition.new(params[:chart_condition])

    respond_to do |format|
      if @chart_condition.save
        format.html { redirect_to @chart_condition, notice: 'Chart condition was successfully created.' }
        format.json { render json: @chart_condition, status: :created, location: @chart_condition }
      else
        format.html { render action: "new" }
        format.json { render json: @chart_condition.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /chart_conditions/1
  # PUT /chart_conditions/1.json
  def update
    @chart_condition = ChartCondition.find(params[:id])

    respond_to do |format|
      if @chart_condition.update_attributes(params[:chart_condition])
        format.html { redirect_to @chart_condition, notice: 'Chart condition was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @chart_condition.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /chart_conditions/1
  # DELETE /chart_conditions/1.json
  def destroy
    @chart_condition = ChartCondition.find(params[:id])
    @chart_condition.destroy

    respond_to do |format|
      format.html { redirect_to chart_conditions_url }
      format.json { head :no_content }
    end
  end
end

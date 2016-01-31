class Alert::ItemsController < ApplicationController
  # GET /alert/items
  # GET /alert/items.json
  def index
    @alert_items = Alert::Item.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @alert_items }
    end
  end

  # GET /alert/items/1
  # GET /alert/items/1.json
  def show
    @alert_item = Alert::Item.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @alert_item }
    end
  end

  # GET /alert/items/new
  # GET /alert/items/new.json
  def new
    @alert_item = Alert::Item.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @alert_item }
    end
  end

  # GET /alert/items/1/edit
  def edit
    @alert_item = Alert::Item.find(params[:id])
  end

  # POST /alert/items
  # POST /alert/items.json
  def create
    @alert_item = Alert::Item.new(params[:alert_item])

    respond_to do |format|
      if @alert_item.save
        format.html { redirect_to @alert_item, notice: 'Item was successfully created.' }
        format.json { render json: @alert_item, status: :created, location: @alert_item }
      else
        format.html { render action: "new" }
        format.json { render json: @alert_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /alert/items/1
  # PUT /alert/items/1.json
  def update
    @alert_item = Alert::Item.find(params[:id])

    respond_to do |format|
      if @alert_item.update_attributes(params[:alert_item])
        format.html { redirect_to @alert_item, notice: 'Item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @alert_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /alert/items/1
  # DELETE /alert/items/1.json
  def destroy
    @alert_item = Alert::Item.find(params[:id])
    @alert_item.destroy

    respond_to do |format|
      format.html { redirect_to alert_items_url }
      format.json { head :no_content }
    end
  end
end

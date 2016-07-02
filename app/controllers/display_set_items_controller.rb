class DisplaySetItemsController < ApplicationController
  # GET /display_set_items
  # GET /display_set_items.json
  def index
    @display_set_items = DisplaySetItem.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @display_set_items }
    end
  end

  # GET /display_set_items/1
  # GET /display_set_items/1.json
  def show
    @display_set_item = DisplaySetItem.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @display_set_item }
    end
  end

  # GET /display_set_items/new
  # GET /display_set_items/new.json
  def new
    @display_set_item = DisplaySetItem.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @display_set_item }
    end
  end

  # GET /display_set_items/1/edit
  def edit
    @display_set_item = DisplaySetItem.find(params[:id])
  end

  # POST /display_set_items
  # POST /display_set_items.json
  def create
    @display_set_item = DisplaySetItem.new(params[:display_set_item])

    respond_to do |format|
      if @display_set_item.save
        format.html { redirect_to @display_set_item, notice: 'Display set item was successfully created.' }
        format.json { render json: @display_set_item, status: :created, location: @display_set_item }
      else
        format.html { render action: "new" }
        format.json { render json: @display_set_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /display_set_items/1
  # PUT /display_set_items/1.json
  def update
    @display_set_item = DisplaySetItem.find(params[:id])

    respond_to do |format|
      if @display_set_item.update_attributes(params[:display_set_item])
        format.html { redirect_to @display_set_item, notice: 'Display set item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @display_set_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /display_set_items/1
  # DELETE /display_set_items/1.json
  def destroy
    @display_set_item = DisplaySetItem.find(params[:id])
    @display_set_item.destroy

    respond_to do |format|
      format.html { redirect_to display_set_items_url }
      format.json { head :no_content }
    end
  end

  def list
    @remark=params[:remark]

    render partial: 'list'
  end
end

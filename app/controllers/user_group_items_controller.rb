class UserGroupItemsController < ApplicationController
  # GET /user_group_items
  # GET /user_group_items.json
  def index
    @user_group_items = UserGroupItem.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @user_group_items }
    end
  end

  # GET /user_group_items/1
  # GET /user_group_items/1.json
  def show
    @user_group_item = UserGroupItem.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user_group_item }
    end
  end

  # GET /user_group_items/new
  # GET /user_group_items/new.json
  def new
    @user_group_item = UserGroupItem.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user_group_item }
    end
  end

  # GET /user_group_items/1/edit
  def edit
    @user_group_item = UserGroupItem.find(params[:id])
  end

  # POST /user_group_items
  # POST /user_group_items.json
  def create
    @user_group_item = UserGroupItem.new(params[:user_group_item])

    respond_to do |format|
      if @user_group_item.save
        format.html { redirect_to @user_group_item, notice: 'User group item was successfully created.' }
        format.json { render json: @user_group_item, status: :created, location: @user_group_item }
      else
        format.html { render action: "new" }
        format.json { render json: @user_group_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /user_group_items/1
  # PUT /user_group_items/1.json
  def update
    @user_group_item = UserGroupItem.find(params[:id])

    respond_to do |format|
      if @user_group_item.update_attributes(params[:user_group_item])
        format.html { redirect_to @user_group_item, notice: 'User group item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user_group_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_group_items/1
  # DELETE /user_group_items/1.json
  def destroy
    @user_group_item = UserGroupItem.find(params[:id])
    @user_group_item.destroy

    respond_to do |format|
      format.html { redirect_to user_group_items_url }
      format.json { head :no_content }
    end
  end
end

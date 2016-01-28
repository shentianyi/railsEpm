class Task::ItemsController < ApplicationController
  # GET /task/items
  # GET /task/items.json
  def index
    @task_items = Task::Item.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @task_items }
    end
  end

  # GET /task/items/1
  # GET /task/items/1.json
  def show
    @task_item = Task::Item.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task_item }
    end
  end

  # GET /task/items/new
  # GET /task/items/new.json
  def new
    @task_item = Task::Item.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @task_item }
    end
  end

  # GET /task/items/1/edit
  def edit
    @task_item = Task::Item.find(params[:id])
  end

  # POST /task/items
  # POST /task/items.json
  def create
    @task_item = Task::Item.new(params[:task_item])

    respond_to do |format|
      if @task_item.save
        format.html { redirect_to @task_item, notice: 'Item was successfully created.' }
        format.json { render json: @task_item, status: :created, location: @task_item }
      else
        format.html { render action: "new" }
        format.json { render json: @task_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /task/items/1
  # PUT /task/items/1.json
  def update
    @task_item = Task::Item.find(params[:id])

    respond_to do |format|
      if @task_item.update_attributes(params[:task_item])
        format.html { redirect_to @task_item, notice: 'Item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @task_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /task/items/1
  # DELETE /task/items/1.json
  def destroy
    @task_item = Task::Item.find(params[:id])
    @task_item.destroy

    respond_to do |format|
      format.html { redirect_to task_items_url }
      format.json { head :no_content }
    end
  end
end

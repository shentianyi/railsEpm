class DisplaySetListsController < ApplicationController
  # GET /display_set_lists
  # GET /display_set_lists.json
  def index
    @display_set_lists = DisplaySetList.order('name desc').paginate(:page => params[:page])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @display_set_lists }
    end
  end

  # GET /display_set_lists/1
  # GET /display_set_lists/1.json
  def show
    @display_set_list = DisplaySetList.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @display_set_list }
    end
  end

  # GET /display_set_lists/new
  # GET /display_set_lists/new.json
  def new
    @display_set_list = DisplaySetList.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @display_set_list }
    end
  end

  # GET /display_set_lists/1/edit
  def edit
    @display_set_list = DisplaySetList.find(params[:id])
  end

  # POST /display_set_lists
  # POST /display_set_lists.json
  def create
    @display_set_list = DisplaySetList.new(params[:display_set_list])

    respond_to do |format|
      if @display_set_list.save
        format.html { redirect_to @display_set_list, notice: 'Display set list was successfully created.' }
        format.json { render json: @display_set_list, status: :created, location: @display_set_list }
      else
        format.html { render action: "new" }
        format.json { render json: @display_set_list.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /display_set_lists/1
  # PUT /display_set_lists/1.json
  def update
    @display_set_list = DisplaySetList.find(params[:id])

    respond_to do |format|
      if @display_set_list.update_attributes(params[:display_set_list])
        format.html { redirect_to @display_set_list, notice: 'Display set list was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @display_set_list.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /display_set_lists/1
  # DELETE /display_set_lists/1.json
  def destroy
    @display_set_list = DisplaySetList.find(params[:id])
    @display_set_list.destroy

    respond_to do |format|
      format.html { redirect_to display_set_lists_url }
      format.json { head :no_content }
    end
  end

  def add_lists
    @product_lines=current_user.tenant.departments.where(is_product_line: true)
    if request.post?
      DisplaySetListService.create_lists(params, current_user)
      # @display_set_lists = DisplaySetList.all
      render nothing: true
    end
  end

  def display_set_items
    puts params
    @display_set_list=DisplaySetList.find_by_id(params[:id])
    @display_set_items = @display_set_list.display_set_items.paginate(:page => params[:page])
    @page_start=(params[:page].nil? ? 0 : (params[:page].to_i-1))*20
  end

  def set_product_line
    puts params
    DisplaySetListService.set_product_line(params[:date], params[:product_line_id], params[:status]=='true')
    render nothing: true
  end
end

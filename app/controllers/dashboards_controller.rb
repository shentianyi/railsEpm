class DashboardsController < ApplicationController

  def new
    render
  end

  def create
     @new_dashboard = Dashboard.new(params[:data])
     @new_dashboard.user_id = current_user.id
     msg = new_message
     if !@new_dashboard.save
       msg[:errors]= @new_dashboard.errors.full_messages
     else
       msg[:result]=true
       msg[:id]=@new_dashboard.id
       msg[:object] = @new_dashboard
     end
     respond_to do |t|
       t.json {render :json=>msg}
       t.js {render :js=> jsonp_str(msg)}
     end
  end


  def destroy
    Dashboard.destroy(params[:id])
    respond_to do |t|
      t.json {render :json=>{:result=>true,:id=>params[:id]}}
      t.js {render :js=> jsonp_str({:result=>true,:id=>params[:id]})}
    end
  end



  def update
    msg = new_message
    @dashboard = Dashboard.find(params[:dashboard][:id])
    if @dashboard && @dashboard.update_attributes(params[:dashboard])
      msg[:result]=true
    else
      msg[:errors]=@dashboard.errors.full_messages
    end
    msg[:id]=params[:dashboard][:id]
    respond_to do |t|
      t.json {render :json=>msg}
      t.js {render :js=>jsonp_str(msg)}
    end
  end

  def index
    @dashboards = Dashboard.find_all_by_user_id(current_user.id)
    render
  end



end

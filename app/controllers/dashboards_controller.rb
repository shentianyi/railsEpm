class DashboardsController < ApplicationController

  def new
    render
  end

  def create
     @new_dashboard = Dashboard.new(params[:dashboard])
     @new_dashboard.user_id = current_user.id
     msg = new_message
     if !@new_dashboard.save
       msg[:errors]= @new_dashboard.errors.full_messages
     else
       msg[:result]=true
     end
     respond_to do |t|
       t.json {render :json=>{:result=>false,:errors=>@new_dashboard.errors.full_messages}}
       t.js {render :js=> jsonp_str({:result=>false,:errors=>@new_dashboard.errors.full_messages})}
     end
  end


  def destroy
    Dashboard.destroy(params[:id])
    respond_to do |t|
      t.json {render :json=>{:result=>true}}
      t.js {render :js=> jsonp_str({:result=>true})}
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
    respond_to do |t|
      t.json {render :json=>msg}
      t.js {render :js=>jsonp_str(msg)}
    end
  end



end

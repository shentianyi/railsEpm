#encoding: utf-8
class DashboardsController < ApplicationController
  before_filter :require_user_as_director,:only=>:index
  before_filter :require_user_as_admin, :only=>:import_dashboards
  layout "fullsize", :only => :fullsize

  def new
    #render
  end

  def create
     @new_dashboard = Dashboard.new(params[:data])
     @new_dashboard.user_id = current_user.id
     msg = new_message
     if !@new_dashboard.save
       msg[:errors]= @new_dashboard.errors.full_messages
     else
       msg[:result]=true
       #msg[:id]=@new_dashboard.id
       msg[:object] = @new_dashboard.id
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
    @dashboard = Dashboard.find(params[:id])
    if @dashboard && @dashboard.update_attributes(params[:data])
      msg[:result]=true
    else
      msg[:result]=false
      if @dashboard
        msg[:errors]=@dashboard.errors.full_messages
      end
    end
    msg[:id]=params[:id]
    respond_to do |t|
      t.json {render :json=>msg}
      t.js {render :js=>jsonp_str(msg)}
    end
  end

  def index
    get_ability_category

    get_kpis_by_category

    get_user_entity_groups

    @dashboards = Dashboard.find_all_by_user_id(current_user.id)
    @full_size=params[:full_size].present?

    render
  end

  def fullsize
    @dashboard = Dashboard.find(params[:id])
    render
  end

  def import_dashboards

  end
end

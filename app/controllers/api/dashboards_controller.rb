# -*- coding: utf-8 -*-
#RESTFUL api 专用的控制器，对仪表盘对象进行CRUD操作
module Api
class DashboardsController < ApiController
  #
  #根据当前当前登陆的用户获得其用户名下所有的仪表盘
  def index
    #@dashboards = Dashboard.find_all_by_user_id(current_user.id)
    @dashboards = Dashboard.where("user_id = ?",current_user.id).select("id,name");
    respond_to do |t|
      t.json {render :json=>@dashboards}
      t.js {render :js=>jsonp_str(@dashboards)}
    end
  end


  #
  #@param :id dashboard's id
  def show
    @dashboard = Dashboard.find(params[:id])
    respond_to do |t|
      t.json {render :json=>@dashboard}
      t.js {render :js=>jsonp_str(@dashboard)}
    end
  end
          end
end

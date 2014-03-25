#encoding: utf-8
class Admin::DashboardsController < Admin::ApplicationController
  # Get /admin/dashboards
  # Get /admin/dashboards.json
  def index

  end

  # POST /admin/dashboards/import
  # POST /admin/dashboards/import.json
  def import_dashboards
    msg = Message.new
    msg.result = false


    render :json=>msg
  end
end

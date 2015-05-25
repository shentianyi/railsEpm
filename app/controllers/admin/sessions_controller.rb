#encoding: utf-8
class Admin::SessionsController < Admin::ApplicationController

  def index
    render :layout => "admin_application"
  end

end

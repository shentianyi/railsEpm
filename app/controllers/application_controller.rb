#encoding: utf-8
class ApplicationController < ActionController::Base
  #  include UrlHelper
 # set_current_tenant_through_filter
#  before_filter :authorize
 # before_filter :find_current_user_tenant
  protect_from_forgery
  def authorize
    unless @current_user=User.find_by_id(session[:user_id])
      render :json=>{:auth=>false}
    end
  end

  def find_current_user_tenant
    current_tenant=Tenant.find_by_id(@current_user.tenant_id)
    set_current_tenant(current_tenant)
  end

end

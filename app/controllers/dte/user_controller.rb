# encoding : utf-8
module Dte
class UserController < ApplicationController
  
  before_filter  :authenticate
  
  def getObservedKpiStatusWithOrgId
    user = User.find(session[:userId])
    kEntity = params[:orgId]
    iType = params[:dateTimeType]
    type = $timeTypeInvert[iType]
    hash = {}
    user.subscription.each do |hFma|
      data = Datum.find_current( kEntity, hFma, type )
      hash[hFma] = data.state
    end
    
    render :json => @auth_head + [hash]
  end  
  
  def getObservedKpiWithOrgId
    user = User.find(session[:userId])
    kEntity = params[:orgId]
    
    
  end
  
  
  
end
end
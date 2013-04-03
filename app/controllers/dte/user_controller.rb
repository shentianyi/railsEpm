# encoding : utf-8
module Dte
class UserController < ApplicationController
  
  before_filter  :authenticate
  
  def getObservedKpiStatusWithOrgId
    user = User.find_by_account(session[:userId])
    kEntity = params[:orgId]
    iType = params[:dateTimeType].to_i
    type = $timeTypeInvert[iType]

    hash = {}
    user.subscription.each do |hFma|
      data = Datum.find_current( kEntity, hFma, type )
      hash[hFma] = data.state
    end
    
    render :json => @auth_head + [hash]
  end  
  
  def getObservedKpiWithOrgId
    user = User.find_by_account(session[:userId])
    kEntity = params[:orgId]
    iType = params[:dateTimeType].to_i
    type = $timeTypeInvert[iType]
    
    arr = []
    user.subscription.each do |hFma|
      data = Datum.find_current( kEntity, hFma, type )
      spec = Specific.find_current( kEntity, hFma )
      hash = { :current=> data.current, :target=>spec.targetKPI }
      arr << hash
    end
    
    render :json => @auth_head + arr
  end
  
  def getKpiList
    sIndex = params[:indexFrom]
    eIndex = params[:indexTo]
    
    arr = DataFormula.selection_list( sIndex, eIndex )
    
    render :json => @auth_head + arr
  end
  
  
end
end
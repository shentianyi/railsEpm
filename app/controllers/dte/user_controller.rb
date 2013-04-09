# encoding : utf-8
module Dte
class UserController < ApplicationController
  
  before_filter  :authenticate
  
  # [功能：] 获取当前用户所订阅的 kpi 的状态代码。
  def getObservedKpiStatusWithOrgId
    user = User.find_by_account(session[:userId])
    kEntity = params[:orgId]
    iType = params[:dateTimeType].to_i
    type = $timeTypeInvert[iType]

    hash = {}
    user.subscription(kEntity).each do |hFma|
      data = Datum.find_current( kEntity, hFma, type )
      hash[hFma] = data.state if data
    end
    
    render :json => @auth_head + [hash]
  end  
  
  # [功能：] 获取所有当前用户订阅的 kpi 概览。
  def getObservedKpiWithOrgId
    user = User.find_by_account(session[:userId])
    kEntity = params[:orgId]
    iType = params[:dateTimeType].to_i
    type = $timeTypeInvert[iType]
    
    arr = []
    user.subscription(kEntity).each do |hFma|
      data = Datum.find_current( kEntity, hFma, type )
      next unless data
      spec = Specific.find_by_kE_hF( kEntity, hFma )
      formula = DataFormula.find( hFma )
      hash = { :kpiId=>formula.key, :kpiName=>formula.name, :kpiDesc=>formula.desc,
                      :currentValue=> data.current, :targetValue=>spec.targetKPI, :initValue=>spec.leastKPI }
      arr << hash
    end
    
    render :json => @auth_head + arr
  end
  
  # [功能：] 获得一部分系统预设的 kpi 列表。
  def getKpiList
    sIndex = params[:indexFrom]
    eIndex = params[:indexTo]
    
    arr = DataFormula.selection_list( sIndex, eIndex )
    
    render :json => @auth_head + arr
  end
  
  def setObservedKpiList
    user = User.find_by_account(session[:userId])
    kEntity = params[:orgId]
    sFormula = params[:kpiIds]
    
    user.subscription_update( kEntity, sFormula.split(';') )
    
    render :json => @auth_head
  end

  
end
end
# encoding : utf-8
module Dte
class EntityController < ApplicationController
  
  before_filter  :authenticate
  
  def getChildOrgnizationsWithParentOrgId
    kParent = params[:parentId]
    entity = Entity.find(kParent)
    sons = entity.son_nodes.map {|k| { :orgId=>k, :orgName=>Entity.find(k).name } }
    
    
    render :json => @auth_head + sons
  end
  
  def getParentWithChildOrgId
    kSon = params[:childOrgId]
    entity = Entity.find(kSon)
    parent = entity.parent_nodes.map {|k| { :orgId=>k, :orgName=>Entity.find(k).name } }

    render :json => @auth_head + parent
  end
  
  def rootOrganization
    user = User.find_by_account(session[:userId])
    rot = user.entity.root
    
    arr = [{ :orgId=>rot.key, :orgName=>rot.name }]
    
    render :json => @auth_head + arr
  end
  
  def getContactWithOrganizationId
    kEntity = params[:orgId]
    entity = Entity.find( kEntity )
    arr = [ entity.contact ]
    
    render :json => @auth_head + arr
  end
  
  def getKpiDetails
    hFormula = params[:kpiId]
    kEntity = params[:orgId]
    spec = Specific.find_current( kEntity, hFormula )
    arr = [ spec ]
    
    render :json => @auth_head + arr
  end
  
  def getKpi
    hFormula = params[:kpiId]
    kEntity = params[:orgId]
    iType = params[:dateTimeType].to_i
    type = $timeTypeInvert[iType]
    data = Datum.find_current( kEntity, hFormula, type )
    arr = [ data ]
    
    render :json => @auth_head + arr
  end
  
  def getKpiNodeSequenceWithKpiId
    hFormula = params[:kpiId]
    kEntity = params[:orgId]
    sTime = params[:fromTime]
    eTime = params[:toTime]
    iType = params[:dateTimeType].to_i
    type = $timeTypeInvert[iType]
    
    arr = []
    (sTime..eTime).each do |t|
      data = Datum.find_point( kEntity, hFormula, type, t )
      hash = { :value=> data.current, :dateTime=>t.iso8601 }
      arr << hash
    end
    
    render :json => @auth_head + arr
  end
  
  
end
end

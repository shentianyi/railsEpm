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
    user = User.find(session[:userId])
    rot = user.entity.root
    
    arr = [{ :orgId=>rot.key, :orgName=>rot.name }]
    
    render :json => @auth_head + arr
  end
  
  def getContactWithOrganizationId
    kEntity = params[:orgId]
    entity = Entity.find( kEntity )
    arr = [ entity.contact_detail ]
    
    render :json => @auth_head + arr
  end
  
  def getKpiDetails
    hFormula = params[:kpiId]
    kEntity = params[:orgId]
    Entity.find_custom( kEntity, hFormula )
    
    render :json => @auth_head + arr
  end
  
  def getKpi
    hFormula = params[:kpiId]
    kEntity = params[:orgId]
    type = params[:type]
    
  end
  
  def getKpiNodeSequenceWithKpiId
    hFormula = params[:kpiId]
    kEntity = params[:orgId]
    type = params[:type]
    sTime = params[:fromTime]
    eTime = params[:toTime]
  end
  
  
end
end

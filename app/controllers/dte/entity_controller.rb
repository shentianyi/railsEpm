# encoding : utf-8
module Dte
class EntityController < ApplicationController
  
  before_filter  :authenticate
  
  def getChildOrgnizationsWithParentOrgId
    kParent = params[:parentId]
    entity = Entity.find_by_key(kParent)
    sons = entity.son_nodes.map {|k| { :orgId=>k, :orgName=>Entity.find_by_key(k).name } }
    
    render :json => [
      { :loginStatusCode=>$loginOK, :authStatusCode=>$authOK },
      sons
    ]
  end
  
  def getParentWithChildOrgId
    kSon = params[:childOrgId]
    entity = Entity.find_by_key(kSon)
    parent = entity.parent_node.map {|k| { :orgId=>k, :orgName=>Entity.find_by_key(k).name } }

    render :json => [
      { :loginStatusCode=>$loginOK, :authStatusCode=>$authOK },
      parent
    ]
  end
  
  def rootOrganization
    user = User.find(session[:userId])
    rot = user.entity.root
    
    arr = [{ :orgId=>rot.key, :orgName=>rot.name }]
    
    render :json => [
      { :loginStatusCode=>$loginOK, :authStatusCode=>$authOK },
      arr
    ]
  end
  
  def getContactWithOrganizationId
    params[:orgId]
    
  end
  
  
  
  
  
  
end
end
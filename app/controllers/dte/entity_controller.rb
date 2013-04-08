# encoding : utf-8
module Dte
class EntityController < ApplicationController
  
  before_filter  :authenticate
  
  # [功能：] 根据父节点的 organizationId 获取下一级子元素。
  def getChildOrgnizationsWithParentOrgId
    kParent = params[:parentId]
    entity = Entity.find(kParent)
    sons = entity.son_nodes.map {|k| { :orgId=>k, :orgName=>Entity.find(k).name } }
    
    
    render :json => @auth_head + sons
  end
  
  # [功能：] 获取指定子节点的上级父节点。
  def getParentWithChildOrgId
    kSon = params[:childOrgId]
    entity = Entity.find(kSon)
    parent = entity.parent_nodes.map {|k| { :orgId=>k, :orgName=>Entity.find(k).name } }

    render :json => @auth_head + parent
  end
  
  # [功能：] 获取组织架构树的根节点。
  # 参数：
  # - 无
  # 返回值：
  # - 代表根节点的 EPMOrganization 对象
  def rootOrganization
    user = User.find_by_account(session[:userId])
    rot = user.entity.root
    
    arr = [{ :orgId=>rot.key, :orgName=>rot.name }]
    
    render :json => @auth_head + arr
  end
  
  # [功能：] 获取指定组织架构节点的联系人信息。
  def getContactWithOrganizationId
    kEntity = params[:orgId]
    entity = Entity.find( kEntity )
    arr = [ entity.contact ]
    
    render :json => @auth_head + arr
  end
  
  # [功能：] 获取一个组织机构节点上某个 kpi 的定制的详细情况。
  def getKpiDetails
    hFormula = params[:kpiId]
    kEntity = params[:orgId]
    spec = Specific.find_by_kE_hF( kEntity, hFormula )
    arr = [ spec ]
    
    render :json => @auth_head + arr
  end
  
  # [功能：] 获取一个组织机构节点上某个 kpi 的概况。
  def getKpi
    hFormula = params[:kpiId]
    kEntity = params[:orgId]
    iType = params[:dateTimeType].to_i
    type = $timeTypeInvert[iType]
    data = Datum.find_current( kEntity, hFormula, type )
    spec = Specific.find_by_kE_hF( kEntity, hFma )
    hash = { :currentValue=>data.current, :targetValue=>spec.targetKPI, :initValue=>spec.leastKPI }
    
    render :json => @auth_head + [hash]
  end
  
  # [功能：] 获取指定组织机构节点上的指定 kpi 在某个时间区间的变化对象,每一个EPMKpiNode 代表在时间图表上的一个点。
  def getKpiNodeSequenceWithKpiId
    hFormula = params[:kpiId]
    kEntity = params[:orgId]
    sTime = Time.parse(params[:fromTime])
    eTime = Time.parse(params[:toTime])
    iType = params[:dateTimeType].to_i
    type = $timeTypeInvert[iType]
    zk = Datum.gen_key_zset( kEntity, hFormula, type )
    
    arr = []
    $redis.zrangebyscore(zk, sTime, eTime, :withscore=>true).each do |k, s|
      data = Datum.find( k )
      hash = { :value=> data.current, :dateTime=>Time.at(s).iso8601 }
      arr << hash
    end
    
    render :json => @auth_head + arr
  end
  
  
end
end

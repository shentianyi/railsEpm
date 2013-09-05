#encoding: utf-8
class KpisController < ApplicationController
  before_filter :get_ability_category,:only=>[:index,:assign],:if=>lambda{|c|   action_name=="assign" ? request.get?  : true}
  before_filter :get_kpis_by_category,:only=>[:get_by_category,:assign],:if=>lambda{|c|   action_name=="assign" ? request.get?  : true}
  
  def index
    @active_category_id=params[:p].nil? ? @categories[0].id : params[:p].to_i
    @kpis=get_kpis_by_category @active_category_id

    @units=KpiUnit.all
    @frequencies=KpiFrequency.all
    @directions=KpiDirection.all
    @base_kpis=Kpi.base_kpis  current_ability
  end

  # create api
  def create
    msg=Message.new
    @kpi=Kpi.new(params[:kpi])
    @kpi.creator=current_user
    if @kpi.save
    msg.result=true
    msg.object=@kpi.id
    else
       puts @kpi.errors.messages.to_json
     @kpi.errors.messages[:result]="添加失败"
     msg.content=@kpi.errors.messages.values.join('; ')
    end
    render :json=>msg
  end

  # edit kpi
  def edit
    @kpi=Kpi.ability_find_by_id(params[:id],current_ability)
  end

  # update kpi
  def update
    if @kpi=Kpi.ability_find_by_id(params[:kpi].delete(:id),current_ability)
      render :json=>@kpi.update_attributes(params[:kpi])
    end
  end

  # delete kpi
  def destroy
    msg=Message.new
    if @kpi=Kpi.accessible_by(current_ability).find_by_id(params[:id])
      if @kpi.kpi_parent_items.count==0
      @kpi.destroy
      msg.result=true
      else
        msg.content='can not destroy, as basci kpi'
      end
    end
    render :json=>msg
  end

  def assign
    @user_kpis=KpisHelper.get_kpis_by_user_id params[:id],current_ability
    if request.get?
      @user_id=params[:id]
    else
      if params[:kpi] and params[:kpi].length>0
        KpisHelper.assign_kpi_to_user_by_id params[:kpi],params[:id],current_ability
      elsif params[:category] and params[:category].length>0
        KpisHelper.assign_kpi_to_user_by_category params[:category],params[:id],current_ability
      end
      render :partial=>'user_kpi'
    end
  end

  def get_by_category 
    render :json=>@kpis
  end

  def user_kpis
    @user_kpis=KpisHelper.get_kpis_by_user_id params[:user],current_ability
  end

end

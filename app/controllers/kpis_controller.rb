#encoding: utf-8
class KpisController < ApplicationController
  before_filter :get_ability_category,:only=>[:index]
  def index
    @active_category_id=params[:p].nil? ? @categories[0].id : params[:p].to_i
    @kpis=Kpi.accessible_by(current_ability).joins(:kpi_category).where(:kpi_category_id=>@active_category_id).select("kpis.*,kpi_categories.name as 'category_name'").all

    @units=KpiUnit.all
    @frequencies=KpiFrequency.all
    @directions=KpiDirection.all
    @base_kpis=Kpi.accessible_by(current_ability).where(:is_calculated=>false).all
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
      msg.content=@kpi.errors.messages.values.join('; ')
    end
    render :json=>msg
  end

  # edit kpi
  def edit
    @kpi=Kpi.accessible_by(current_ability).find_by_id(params[:id])
  end

  # update kpi
  def update
    if @kpi=Kpi.accessible_by(current_ability).find_by_id(params[:kpi].delete(:id))
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
      get_ability_category
      get_kpis_by_category

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

  def kpi_option
    get_kpis_by_category
    @options=params[:options]
    @prompt=!params[:prompt].nil?
    render :partial=>'select_option'
  end

  def user_kpis
    @user_kpis=KpisHelper.get_kpis_by_user_id params[:user],current_ability
  end

  def get_ability_category
    @categories=KpiCategory.accessible_by(current_ability).all
  end

  def get_kpis_by_category
    id=params[:id].nil? ? @categories[0].id : params[:id].to_i
    @kpis=Kpi.accessible_by(current_ability).joins(:kpi_category).where(:kpi_category_id=>id).select("kpis.*,kpi_categories.name as 'category_name'").all
  end
end

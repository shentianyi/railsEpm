#encoding: utf-8
class KpisController < ApplicationController
  before_filter :get_ability_category,:only=>[:index]
  def index
    @active_category_id=params[:p].nil? ? @categories[0].id : params[:p].to_i
    @kpis=Kpi.accessible_by(current_ability).where(:kpi_category_id=>@active_category_id).all

    @units=KpiUnit.all
    @frequencies=KpiFrequency.all
    @directions=KpiDirection.all
    @base_kpis=Kpi.accessible_by(current_ability).where(:is_calculated=>false).all
  end
# 
  # def new
    # @units=KpiUnit.all
    # @frequencies=KpiFrequency.all
    # @directions=KpiDirection.all
    # render :partial=>'new'
  # end

  # create api
  def create
    if request.post?
      @kpi=Kpi.new(:name=>params[:kpi])
      @kpi.creator=@current_user
      render :json=>@kpi.save
    end
  end

  # edit kpi
  def edit
    @kpi=Kpi.find_by_id(params[:id])
  end

  # update kpi
  def update
    if @kpi=Kpi.find_by_id(params[:kpi][:id])
      render :json=>@kpi.update_attributes(params[:kpi])
    end
  end

  # delete kpi
  def destroy
    if @kpi=Kpi.find_by_id(params[:id])
      if @kpi.kpi_parents.count==0
      @kpi.destroy
      else
        render :json=>'can not destroy, as basci kpi'
      end
    end
  end

  def assign
    if request.post?
      KpisHelper.assign_kpi_to_user_by_id params[:kpi],params[:user]
    end
  end

  def user_kpis
    @kpis=KpisHelper.get_kpis_by_user_id params[:user]
  end

  def get_ability_category
    @categories=KpiCategory.accessible_by(current_ability).all
  end
end

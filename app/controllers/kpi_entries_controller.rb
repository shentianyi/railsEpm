#encoding: utf-8
class KpiEntriesController < ApplicationController
  # create or update kpi entry
  before_filter :get_ability_category,:only=>[:analyse]
  def entry
    if request.post?
      @kpi_entry=KpiEntriesHelper.create_update_kpi_entry params
      render :json=>{:result=>true}
    end
  end

  def new
    @f = params[:f].nil? ? KpiFrequency::Hourly : params[:f].to_i
    # @entry_at=KpiEntriesHelper.reparse_entry_date(@f,Time.now)
    # @user_kpis=KpisHelper.get_kpis_by_user_and_frequency current_user,@f
  end

  #
  def refresh_entry
    @f = params[:f].nil? ? KpiFrequency::Hourly : params[:f].to_i
    @entry_at=KpiEntriesHelper.reparse_entry_date(@f,KpiEntriesHelper.parse_entry_date(@f,params[:date]))
    @user_kpis=KpisHelper.get_kpis_by_user_and_frequency current_user,@f
    render :partial=>'entry'
  end

  def analyse
    if request.get?
      # @ent
      @entity_groups=current_user.entity_groups.accessible_by(current_ability)
      get_ability_category
      get_kpis_by_category
    else
      msg=Message.new
      if data=KpiEntryAnalyseHelper.get_kpi_entry_analysis_data(params[:kpi],params[:entity_group],params[:startTime],params[:endTime],params[:average]=="true")
      msg.result=true
      msg.object=data
      end
      render :json=>msg
    end
  end

  def kpi_option
    get_kpis_by_category
    @options=params[:options]
    @prompt=!params[:prompt].nil?
    render :partial=>'select_option'
  end

  private

  #冗余
  def get_ability_category
    @categories=KpiCategory.accessible_by(current_ability).all
  end


  #冗余
  def get_kpis_by_category
    id=params[:id].nil? ? @categories[0].id : params[:id].to_i
    @kpis=Kpi.accessible_by(current_ability).joins(:kpi_category).where(:kpi_category_id=>id).select("kpis.*,kpi_categories.name as 'category_name'").all
  end
end

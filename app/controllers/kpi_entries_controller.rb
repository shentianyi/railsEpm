#encoding: utf-8
class KpiEntriesController < ApplicationController
  # create or update kpi entry
  before_filter :get_ability_category,:only=>[:analyse],:if=>lambda{|c|  request.get?}
  before_filter :get_kpis_by_category,:only=>[:analyse,:kpi_option],:if=>lambda{|c|   action_name=="analyse" ? request.get?  : true}
  def entry
    if request.post?
      @kpi_entry=KpiEntriesHelper.create_update_kpi_entry params
      render :json=>{:result=>true}
    end
  end

  def new
    @f = params[:f].nil? ? KpiFrequency::Hourly : params[:f].to_i
  end

  #
  def refresh_entry
    @f = params[:f].nil? ? KpiFrequency::Hourly : params[:f].to_i
    @parsed_entry_at=DateTimeHelper.get_utc_time_by_str(params[:date])
    @user_kpis=KpisHelper.get_kpis_by_user_and_frequency current_user,@f
    render :partial=>'entry'
  end

  def analyse
    if request.get?
      @entity_groups=get_user_entity_groups
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
    @options=params[:options]
    @prompt=!params[:prompt].nil?
    render :partial=>'select_option'
  end
end

#encoding: utf-8
module Api
  class KpiEntriesController < ApplicationController
    before_filter :require_no_user, :only=>[:entry,:test_data]
    skip_before_filter :require_user,:only=>[:entry,:test_data]
    skip_before_filter :require_active_user,:only=>[:entry,:test_data]
    skip_before_filter :find_current_user_tenant,:only=>[:entry,:test_data]
    skip_before_filter :check_tenant_status,:only=>[:entry,:test_data]
    skip_authorize_resource :only=>[:entry,:test_data]
    # create or update kpi entry
    def entry
      if request.post?
        if user_kpi_item=UserKpiItem.where(:kpi_id=>params[:kpi_id],:entity_id=>params[:entity_id]).first
          params[:user_kpi_item_id]=user_kpi_item.id
          @kpi_entry=KpiEntriesHelper.create_update_kpi_entry params
          render :json=> @kpi_entry
        else
          render :json=>false
        end
      else
        render :json=>'this is a post'
      end
    end

    def analyse
      # @ent
      @entity_groups=current_user.entity_groups.accessible_by(current_ability)
      get_ability_category
      get_kpis_by_category
      msg=Message.new
      if data=KpiEntryAnalyseHelper.get_kpi_entry_analysis_data(params[:kpi],params[:entity_group],params[:startTime],params[:endTime],params[:average]=="true")
      msg.result=true
      msg.object=data
      end

      respond_to do |t|
        t.json {render :json=>msg}
        t.js {render :js=>jsonp_str(msg)}
      end
    end

    def test_data
      from_date=Time.at((params[:from].to_i)/1000).utc
      to_date=Time.at((params[:to].to_i)/1000).utc
      data=[[],[]]
      
      while((next_date=from_date+60*60)<=to_date) do
        data[0]<<[(from_date.to_f*1000).to_i,Random.rand(100.0).round(2),0,0]
        data[1]<<[(from_date.to_f*1000).to_i,Random.rand(100.0).round(2),0,0]
        from_date=next_date
      end
      sleep(3);
      render :json=>jsonp_str(data)
    end

  end
end
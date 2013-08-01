#encoding: utf-8
module Api
  class KpiEntriesController < ApiController
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

        respond_to do |t|
          t.json {render :json=>msg}
          t.js {render :js=>jsonp_str(msg)}
        end
      end
    end
  end
end
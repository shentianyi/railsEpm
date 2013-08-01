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
  end
end
#encoding: utf-8
module Api
  class KpiEntriesController < ApplicationController
    layout 'pure'
    def analyse
      @kpi_id=params[:kpi_id]
      @kpi_name=params[:kpi_name]
      @entity_group_id=params[:entity_group_id]
      @entity_group_name=params[:entity_group_name]
      @start_time=params[:start_time]
      @end_time=params[:end_time]
      @frequency=params[:frequency]
      # @type=params[:type]
      @type='area'
      # @average= params[:average].nil? ? 'true' : params[:average]
      @average='true'
      @data=KpiEntryAnalyseHelper.get_kpi_entry_analysis_data(@kpi_id,@entity_group_id,@start_time,@end_time,@average=="true",@frequency.to_i)
    end

    def data
      # average= params[:average].nil? ? true : params[:average]=="true"
      average=true
      frequency=params[:frequency].nil? ? nil : params[:frequency].to_i
      data=KpiEntryAnalyseHelper.get_kpi_entry_analysis_data params[:kpi_id],params[:entity_group_id],params[:start_time],params[:end_time],average,frequency,true
      data[:max]=data[:current].values.max
      data[:min]=data[:current].values.min
      respond_to do |t|
        t.json {render :json=>data}
        t.js {render :js=>jsonp_str(data)}
      end
    end
  end
end

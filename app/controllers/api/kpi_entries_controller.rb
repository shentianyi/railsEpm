#encoding: utf-8
module Api
  class KpiEntriesController < ApiController
    layout 'pure'

    def analyse
      @kpi_id=params[:kpi_id]
      @kpi_name=params[:kpi_name]
      @entity_group_id=params[:entity_group_id]
      @entity_group_name=params[:entity_group_name]
      @start_time=params[:start_time]
      @end_time=params[:end_time]
      @frequency=params[:frequency].nil? ? nil : params[:frequency].to_i
      @type='area'
      @average= params[:average].nil? ? true : params[:average]=='true'
      @data=KpiEntryAnalyseHelper.analysis_data(params).to_json
    end

    def data
      data=KpiEntryAnalyseHelper.analysis_data(params)
      respond_to do |t|
        t.json { render :json => data }
      end
    end
  end
end

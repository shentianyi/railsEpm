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
      @frequency=params[:frequency].to_i
      # @type=params[:type]
      @type='area'
      # @average= params[:average].nil? ? true : params[:average]=="true"
      @average='true'
      @data=KpiEntryAnalyseHelper.analysis_data(@kpi_id,@entity_group_id,@start_time,@end_time,@average,@frequency).to_json
    end

    def data
      # average= params[:average].nil? ? true : params[:average]=="true"
      average=true
      frequency=params[:frequency].nil? ? nil : params[:frequency].to_i
      data=KpiEntryAnalyseHelper.analysis_data params[:kpi_id],params[:entity_group_id],params[:start_time],params[:end_time],average,frequency
      respond_to do |t|
        t.json {render :json=>data}
        t.js {render :js=>jsonp_str(data)}
      end
    end

    def mail_test
      @start=Time.now
      average=true
      frequency=params[:frequency].nil? ? nil : params[:frequency].to_i
      # chart_data,table_data=KpiEntryAnalyseHelper.analysis_data params[:kpi_id],params[:entity_group_id],params[:start_time],params[:end_time],average,frequency,false
      # save cache data
      # cache=KpiEntryAnalyseCache.new(id:1,cacheable_type:'Attac',query:'a=9',chart_data:chart_data,table_data:table_data)
      # cache.save

      # send mail
      #  ms=MailerService.new(from_name:'W',from_mail:'song.wang@cz-tek.com',to:['song.wang@cz-tek.com','iwangsong@163.com'],subject:'TEST',text:'TEST TEXT',attachment:'uploadfiles/template/kpi_entry_template.zip')
      #  ms.send_analyse

      # get cache data
      # params should be parsed from cache query
      @kpi_id=params[:kpi_id]
      @kpi_name=params[:kpi_name]
      @entity_group_id=params[:entity_group_id]
      @entity_group_name=params[:entity_group_name]
      @start_time=params[:start_time]
      @end_time=params[:end_time]
      @frequency=params[:frequency].to_i
      @type='area'
      @average='true'

      @data=KpiEntryAnalyseCache.find_by_id(1,'Attac').chart_data

      @end=Time.now
      @span=@end-@start
    # destroy cache
    # cache.destroy

    end
  end
end

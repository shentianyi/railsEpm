#encoding: utf-8
#RESTFUL api
class Api::EmailsController < ApplicationController
  layout 'pure'

  def index
    @emails = Email.find_by_user_id(current_user.id)

    respond_to do |t|
      t.json{render :json=>@emails}
      t.js {render :js=>jsonp_str(@emails)}
    end
  end

  def show
    @email = Email.find(params[:id])

    respond_to do |t|
      t.json{render :json=>@email}
      t.js {render :js=>jsonp_str(@email)}
    end
  end

  def create
    msg = Message.new
    msg.result = true
    # generate pdf attachment file first
    if data = KpiEntryAnalyseHelper.analysis_data(params[:kpi_id],params[:entity_group_id],
                                                params[:start_time],params[:end_time],
                                                params[:average]=="true",params[:frequency].to_i,false)
      @kpi_id = params[:kpi_id];
      @kpi_name = params[:kpi_name]
      @entity_group = params[:entity_group_id]
      @entity_group_name = params[:entity_group_name]
      @start_time = params[:start_time]
      @ent_time = params[:end_time]
      @frequency = params[:frequency]
      @type = params[:type]
      @average=params[:average] ? true : params[:average]=="true"

      datas = {:data=>data.to_json,:kpi_id=>@kpi_id,:kpi_name=>@kpi_name,:entity_group_id=>@entity_group,:entity_group_name=>@entity_group_name,
               :start_time=>@start_time,:end_time=>@end_time,:frequency=>@frequency,:type =>@type, :average=>@average}

      attach_pdf = PdfService.generate_analysis_pdf(datas)

      f = FileData.new(:data=>attach_pdf,:oriName=>"analysis.pdf",:path=>$EMAILATTACHPATH)
      f.saveFile
      #save email in database
      @email = Email.new(:title=>params[:title],:user_id=>current_user.id,:sender=>current_user.email,:receivers=>params[:receivers],:file_path=>f.pathName,:content=>params[:content])
      if msg.result = @email.save
        #send email here
        ms=MailerService.new(from_name:current_user.first_name,from_mail:current_user.email,to:params[:receivers].split(';'),subject:params[:title],text:params[:content],attachment:f.full_path)
        ms.send_analyse
        #save cache
        cache=KpiEntryAnalyseCache.new(id:@email.id,cacheable_type: @email.class.name ,query:params.to_json,chart_data:data,table_data:table_data)
        cache.save
      else
        msg.content = @email.errors.full_messages
      end
    end
    render :json => msg
  end

  def destroy
    msg = Message.new
    msg.result = false

    @email = Email.find(params[:id])
    @email.destroy

    msg.result = true
    render :json=>msg
  end

  def analyse
    cache =KpiEntryAnalyseCache.find_by_id(params[:id],'Email')
    query = JSON.parse(cache.query)
    @kpi_id = query["kpi_id"]
    @kpi_name = query["kpi_name"]
    @entity_group_id=  query["entity_group_id"]
    @entity_group_name = query["entity_group_name"]
    @start_time = query["start_time"]
    @end_time = query["end_time"]
    @frequency = query["frequency"]
    @type = query["type"]
    @data = cache.chart_data
    render
  end
end
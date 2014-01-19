#encoding: utf-8
#RESTFUL api
class Api::EmailsController < ApplicationController
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
    msg.result = false
    # generate pdf attachment file first
    if data=KpiEntryAnalyseHelper.analysis_data(params[:kpi_id],params[:entity_group_id],
                                                params[:start_time],params[:end_time],
                                                params[:average]=="true",params[:frequency].to_i)
      @kpi_id = params[:kpi_id];
      @kpi_name = params[:kpi_name]
      @entity_group = params[:entity_group_id]
      @entity_group_name = params[:entity_group_name]
      @start_time = params[:start_time]
      @ent_time = params[:end_time]
      @frequency = params[:frequency]
      @type = params[:type]
      @average=params[:average] ? true : params[:average]=="true"

      datas = {:data=>data,:kpi_id=>@kpi_id,:kpi_name=>@kpi_name,:entity_group=>@entity_group,:entity_group_name=>@entity_group_name,
               :start_time=>@start_time,:end_time=>@end_time,:frequency=>@frequency,:type =>@type, :average=>@average}


      attach_pdf = PdfService.generate_analysis_pdf(datas)

      f = FileData.new(:data=>attach_pdf,:oriName=>"analysis.pdf",:path=>$EMAILATTACHPATH)
      f.saveFile
      #send email here
      #save email in database
      @email = Email.new(:title=>params[:title],:user_id=>current_user.id,:sender=>current_user.email,:receivers=>params[:receivers],:file_path=>f.pathName,:content=>params[:content])
      if msg.result = @email.save
      else
        msg.content = @email.errors.full_messages
      end
    end
    render :json => msg
  end

  def attach

  end
end
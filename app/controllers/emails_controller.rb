class EmailsController < ApplicationController
  layout "pure"
  # GET /emails
  # GET /emails.json
  def index
    @emails = current_user.emails

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @emails }
    end
  end

  # GET /emails/1
  # GET /emails/1.json
  def show
    @email = Email.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @email }
    end
  end

  # GET /emails/new
  # GET /emails/new.json
  def new
    @email = Email.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @email }
    end
  end

  # GET /emails/1/edit
  def edit
    @email = Email.find(params[:id])
  end

  # POST /emails
  # POST /emails.json
  def create
    msg = Message.new
    msg.result = true
    # generate pdf attachment file first
    if da=KpiEntryAnalyseHelper.analysis_data(params[:kpi_id],params[:entity_group_id],
                                                              params[:start_time],params[:end_time],
                                                              params[:average]=="true",params[:frequency].to_i,false)
      data = da[0]
      table_data = da[1]
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
               :start_time=>@start_time,:end_time=>@end_time,:frequency=>@frequency,:type =>@type, :average=>@average,:table_data => table_data.to_json}

      attach_pdf = PdfService.generate_analysis_pdf(datas)

      f = FileData.new(:data=>attach_pdf,:oriName=>"analysis.pdf",:path=>$EMAILATTACHPATH)
      f.saveFile
      #send email here
      ms=MailerService.new(from_name:current_user.first_name,from_mail:current_user.email,to:params[:receivers].split(';'),subject:params[:title],text:params[:content],attachment:f.full_path)
      ms.send_analyse

      #save email in database
      @email = Email.new(:title=>params[:title],:user_id=>current_user.id,:sender=>current_user.email,:receivers=>params[:receivers],:file_path=>f.pathName,:content=>params[:content])
      if msg.result = @email.save
        #save cache
        cache=KpiEntryAnalyseCache.new(id:@email.id,cacheable_type: @email.class.name ,query:params.to_json,chart_data:data,table_data:table_data)
        cache.save
      else
        msg.content = @email.errors.full_messages
      end

    end
=begin
    respond_to do |format|
      format.pdf do
        render :pdf => f.pathName,
               :template => "templates/demo_pdf.html.erb",
               :show_as_html => true,
               :locals => {:datas=> datas}
      end
    end
=end

    render :json => msg
  end

  # PUT /emails/1
  # PUT /emails/1.json
  def update
    @email = Email.find(params[:id])

    respond_to do |format|
      if @email.update_attributes(params[:email])
        format.html { redirect_to @email, notice: 'Email was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @email.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /emails/1
  # DELETE /emails/1.json
  def destroy
    @email = Email.find params[:id]
    @email.destroy

    respond_to do |format|
      format.html { redirect_to emails_url }
      format.json { head :no_content }
    end
  end

  def analyse
    render
  end
end

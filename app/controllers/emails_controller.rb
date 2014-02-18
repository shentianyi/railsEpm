class EmailsController < ApplicationController
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
    # generate pdf attachment file first
    if data=KpiEntryAnalyseHelper.analysis_data(params[:query][:kpi],params[:query][:entity_group],
                                                              params[:query][:startTime],params[:query][:endTime],
                                                              params[:query][:average]=="true",params[:query][:interval].to_i)
      @kpi_id = params[:query][:kpi_id];
      @kpi_name = params[:query][:kpi_name]
      @entity_group = params[:query][:entity_group_id]
      @entity_group_name = params[:query][:entity_group_name]
      @start_time = params[:query][:start_time]
      @ent_time = params[:query][:end_time]
      @frequency = params[:query][:frequency]
      @type = params[:query][:type]
      @average=params[:query][:average].nil ? true : params[:query][:average]=="true"
      datas<<{:data=>data,:kpi_id=>@kpi_id,:kpi_name=>@kpi_name,:entity_group=>@entity_group,:entity_group_name=>@entity_group_name,
        :start_time=>@start_time,:end_time=>@end_time,:frequency=>@frequency,:type =>@type, :average=>@average}
      attach_pdf = PdfService.generate_analysis_pdf(data)

      f = FileData.new(:data=>attach_pdf,:oriName=>"analysis",:path=>$EMAILATTACHPATH)
      if f.saveFile
        #send email here

        #save email in database
        @email = Email.new(:user_id=>current_user.id,:sender=>current_user.email,:receivers=>params[:receivers],:file_path=>f.pathName)
        if mgs.result = @email.save
        else
          msg.content = @email.errors.full_messages
        end
      end
    end
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
    @email = Email.findparams[:id]
    @email.destroy

    respond_to do |format|
      format.html { redirect_to emails_url }
      format.json { head :no_content }
    end
  end
end

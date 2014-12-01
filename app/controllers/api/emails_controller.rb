#encoding: utf-8
#RESTFUL api
module Api
  class EmailsController < ApiController
    layout 'pure'
    #skip_before_filter :verify_authenticity_token
    #skip_load_and_authorize_resource

    def index
      conditions=params[:conditions]||{}
      conditions[:user_id]=current_user.id
      @emails = Email.search(conditions).paginate(page: params[:page], per_page: 30).order('created_at desc').all
      @emails=EmailPresenter.group_by_time(EmailPresenter.init_presenters(@emails))
      respond_to do |t|
        t.json { render :json => @emails }
        t.js { render :js => jsonp_str(@emails) }
      end
    end

    def show
      @email = Email.find(params[:id])
      respond_to do |t|
        t.json { render :json => @email }
        t.js { render :js => jsonp_str(@email) }
      end
    end

    def create
      msg = Message.new
      msg.result = true
      @email=Email.new(params[:email])
      @email.init_user_info current_user
      if msg.result = @email.save
        Resque.enqueue(EmailSender, @email.id, params)
        #BackgroundTask.send_email(@email.id,params)
        #EmailWorker.perform_async(@email.id,params)
        #Email.handle_email_process  @email.id, params
      else
        msg.content = @email.errors.full_messages
      end
      render :json => msg
    end

    def destroy
      msg = Message.new
      msg.result = false

      @email = Email.find(params[:id])
      @email.destroy

      msg.result = true
      render :json => msg
    end

    def analyse
      if cache =KpiEntryAnalyseCache.find_by_id(params[:id], 'Email')
        query = JSON.parse(cache.query)
        @kpi_id = query["kpi_id"]
        @kpi_name = query["kpi_name"]
        @entity_group_id= query["entity_group_id"]
        @entity_group_name = query["entity_group_name"]
        @start_time = query["start_time"]
        @end_time = query["end_time"]
        @frequency = query["frequency"]
        @type = query["type"]
        @data = cache.chart_data
      else
        error_page_404
      end
    end
  end
end
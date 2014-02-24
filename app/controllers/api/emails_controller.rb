#encoding: utf-8
#RESTFUL api
module Api
  class EmailsController < ApiController
    layout 'pure'

    def index
      conditions=params[:conditoin]||{}
      conditions[:user_id]=current_user.id
      @emails = Email.search(conditions).all
      @emails=EmailPresenter.init_detail_json_presenters(@emails)
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
      cache =KpiEntryAnalyseCache.find_by_id(params[:id], 'Email')
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
    end
  end
end
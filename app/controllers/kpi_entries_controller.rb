#encoding: utf-8
class KpiEntriesController < ApplicationController
  # create or update kpi entry
  skip_before_filter :verify_authenticity_token
  before_filter :get_ability_category, :only => [:analyse], :if => lambda { |c| request.get? }


  def index
    @f = params[:id].nil? ? KpiFrequency::Hourly : params[:id].to_i
    @kpis = Kpi.accessible_by(Ability.new(current_user)).where(frequency: @f)
  end

  def create
    #params["date"] = params["entry_at"]
    #params["email"] = current_user.email
    #params["entry_type"] = 0
    #@kpi_entry=KpiEntriesHelper.create_update_kpi_entry params, current_ability
    render :json => {:result => true}
  end

  def entry
    msg = Message.new
    msg.result = true
    validator = KpiEntryValidator.new(params)
    validator.validate
    if validator.valid
      validator.entry
    end
    render :json => msg
  end

  def details
    user_kpi_item = UserKpiItem.find_by_id(params[:user_kpi_item_id])
    @kpi = user_kpi_item.kpi
    @entity = user_kpi_item.entity
    entries = KpiEntry.where(user_kpi_item_id: params["user_kpi_item_id"],
                             entry_at: params["entry_at"],
                             entity_id: user_kpi_item.entity_id, entry_type: 0) if user_kpi_item
    @kpi_entries = KpiEntryPresenter.init_presenters(entries)
    #respond_to do |format|
    #format.html {render :partial=>'details'}
    #format.js {render :partial=>'details'}
    #end
    render :partial => 'details'
  end

  #
  def show
    @f = params[:f].nil? ? KpiFrequency::Hourly : params[:f].to_i
    @parsed_entry_at=EntryDateTimeHelper.get_utc_time_from_str(params[:date])
    @user_kpis=KpisHelper.get_kpis_by_user_and_frequency current_user, @f
    render :partial => 'entry'
  end

  def destroy
    msg = Message.new
    msg.result = true
    entry = KpiEntry.find_by(id: params[:id])
    if entry
      if entry.entry_type == 1
        msg.result =false
        msg.content = I18n.t "entry.desc.del-error"
      else
        entry.destroy
        total = KpiEntry.find_by(parsed_entry_at: entry.parsed_entry_at, entity_id: entry.entity_id, user_kpi_item_id: entry.user_kpi_item_id, entry_type: 1)
        if total
          msg.content = {item_id: entry.user_kpi_item_id, value: total.value}
        else
          msg.content = {item_id: entry.user_kpi_item_id, value: ""}
        end
      end
    end
    render :json => msg
  end

  def analyse
    @qoros_demo=nil

    if request.get?
      @entity_groups=get_user_entity_groups
      @setting = params[:setting].nil? ? 'analyse' : params[:setting]
      @current_story_set = StorySet.find_by_id(@setting)
      @users=User.where('id <> ?', current_user.id).where(role_id: Role.director).all
      # from kpi subscribes
      if params.has_key?(:s)
        @subscribe=KpiSubscribe.detail_by_id(params[:s]).first
        @subscribe.is_alert = false
        @subscribe.save
        @condition= ChartConditionPresenter.new(@subscribe.chart_condition)
        # condition for sub
        @s_subscribe_id=@subscribe.id
        @s_kpi_category_id=@subscribe.kpi_category_id
        @s_kpi_id=@subscribe.kpi_id
        @s_entity_group_id=@condition.entity_group_id
        @s_start_time= @condition.start_time
        @s_end_time=@condition.end_time
        @s_interval= @condition.interval
        @s_calculate_type=@condition.calculate_type
      elsif params.has_key?(:view)
        kpi=Kpi.find_by_name('Inspect Data')
        @qoros_demo=true
        if kpi
          @s_subscribe_id=0
          @s_entity_group_id=EntityGroup.find_by_name(params[:view]).id
          @s_kpi_category_id=kpi.kpi_category_id
          @s_kpi_id=kpi.id
          @s_start_time=Date.today.to_time.utc
          @s_end_time=Time.parse(Time.now.strftime('%Y-%m-%d %H:00:00')).utc+1.hours
          @s_interval= kpi.frequency
          @s_calculate_type='ACCUNULATE'
        end
      end
    else
      msg=Message.new
      if data=Entry::Analyzer.new(params).analyse
        msg.result=true
        msg.object=data
      end
      render :json => msg
    end
  end

  def compare
    msg=Message.new
    if data=Entry::Analyzer.new(params).period_compare
      msg.result=true
      msg.object=data
    end
    render :json => msg
  end

  def compares
    msg=Message.new
    if data=Entry::Analyzer.new(params).period_compares
      msg.result=true
      msg.object=data
    end
    render :json => msg
  end

  def recents
    render :json => KpiEntry.recent_input(current_user.id, params[:ids], params[:time].to_i)
  end

  def import
    msg=UrlMessage.new(result: true)
    begin
      params[:files].each do |file|
        if file.size<$FILE_MAX_SIZE
          f=FileData.new(data: file, oriName: file.original_filename, path: $KPI_ENTRY_PATH)
          if f.saveFile
            if error=KpiEntryImportHelper.import(f.full_path, f.extention)
              msg.result=false
              msg.url_result=true
              msg.content=error
            end
          end
        else
          msg.result=false
          msg.content="文件大小超过20M"
        end
      end
    rescue Zip::ZipError => e
      msg.result=false
      msg.content="文件不可以打开，可能损坏，请检查！"
    rescue => e
      msg.result =false
      msg.content=e.message
    end
    render json: msg
  end
end

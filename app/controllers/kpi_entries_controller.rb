#encoding: utf-8
class KpiEntriesController < ApplicationController
  # create or update kpi entry
  skip_before_filter :verify_authenticity_token
  before_filter :get_ability_category, :only => [:analyse], :if => lambda { |c| request.get? }


  def index
    @f = params[:id].nil? ? KpiFrequency::Hourly : params[:id].to_i
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
    @kpi_entries = KpiEntry.where(user_kpi_item_id: params["user_kpi_item_id"], parsed_entry_at: params["parsed_entry_at"], entity_id: user_kpi_item.entity_id ,entry_type: 0) if user_kpi_item
    respond_to do |format|
      format.html {render :partial=>'details'}
      #format.js {render :partial=>'details'}
    end
  end

  #
  def show
    @f = params[:f].nil? ? KpiFrequency::Hourly : params[:f].to_i
    @parsed_entry_at=EntryDateTimeHelper.get_utc_time_from_str(params[:date])
    @user_kpis=KpisHelper.get_kpis_by_user_and_frequency current_user, @f
    render :partial => 'entry'
  end

  def analyse
    if request.get?
      @entity_groups=get_user_entity_groups
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
    msg=Message.new(result: true)
    params[:files].each do |file|
      if file.size<$FILE_MAX_SIZE
        f=FileData.new(data: file, oriName: file.original_filename, path: $KPI_ENTRY_PATH)
        if f.saveFile
          if error=KpiEntryImportHelper.import(f.full_path, f.extention)
            msg.result=false
            msg.content=error
          end
        end
      else
        msg.result=false
        msg.content="文件大小超过20M"
      end
    end
    render json: msg
  end
end

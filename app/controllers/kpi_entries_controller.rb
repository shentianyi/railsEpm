#encoding: utf-8
class KpiEntriesController < ApplicationController
  # create or update kpi entry
  before_filter :get_ability_category, :only => [:analyse], :if => lambda { |c| request.get? }


  def index
    @f = params[:id].nil? ? KpiFrequency::Hourly : params[:id].to_i
  end

  def create
    params["date"] = params["entry_at"]
    params["email"] = current_user.email
    params["entry_type"] = 1
    @kpi_entry=KpiEntriesHelper.create_update_kpi_entry params, current_ability
    render :json => {:result => true}
  end


  #
  def show
    @f = params[:f].nil? ? KpiFrequency::Hourly : params[:f].to_i
    @parsed_entry_at=DateTimeHelper.get_utc_time_by_str(params[:date])
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

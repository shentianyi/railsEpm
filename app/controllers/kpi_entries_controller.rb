#encoding: utf-8
class KpiEntriesController < ApplicationController
  # create or update kpi entry
  def entry
    if request.post?
      @kpi_entry=KpiEntriesHelper.create_update_kpi_entry params
      render :json=>{:result=>true}
    end
  end

  def new
    @f = params[:f].nil? ? KpiFrequency::Daily : params[:f].to_i
    @entry_at=KpiEntriesHelper.reparse_entry_date(@f,Time.now)
    @user_kpis=KpisHelper.get_kpis_by_user_and_frequency current_user,@f
  end
#

end

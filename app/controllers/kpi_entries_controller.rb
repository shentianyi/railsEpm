#encoding: utf-8
class KpiEntriesController < ApplicationController
  # create or update kpi entry
  def entry
    if request.post?
      @kpi_entry=KpiEntriesHelper.create_update_kpi_entry params
    end
  end

  def new
    @f = params[:f].nil? ? KpiFrequency::Daily : params[:f].to_i
    @user_kpis=KpisHelper.get_kpis_by_user current_user
  end
#

end

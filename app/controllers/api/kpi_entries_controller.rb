#encoding: utf-8
module Api
  class KpiEntriesController < ApiController
    # create or update kpi entry
    def entry
      if request.post?
        @kpi_entry=KpiEntriesHelper.create_update_kpi_entry params
        render :json=> @kpi_entry
      else
        render :json=>'this is a post'
      end
    end
  end
end
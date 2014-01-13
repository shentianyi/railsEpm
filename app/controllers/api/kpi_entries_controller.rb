#encoding: utf-8
module Api
  class KpiEntriesController < ApplicationController
    layout 'pure'
    def analyse
	@kpi_id=params[:kpi_id]
	@entity_group_id=params[:entity_group_id]
	@start_time=params[:start_time]
	@end_time=params[:end_time]
    end
  end
end

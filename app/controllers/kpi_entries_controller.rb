#encoding: utf-8
class KpiEntriesController < ApplicationController
    def entry
	if request.post?
	    @kpi_entry=KpiEntriesHelper.create_update_kpi_entry params
	end
    end
end

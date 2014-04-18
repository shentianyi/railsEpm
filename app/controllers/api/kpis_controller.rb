module Api
  class KpisController < ApiController
    def kpis_by_category
      get_kpis_by_category(params[:id])
      respond_to do |t|
        t.json { render :json => @kpis }
        t.js { render :js => jsonp_str(@kpis) }
      end
    end

    ## get kpi properties
    def properties
      @kpi_properties =KpiPropertyPresenter.init_json_presenters(Kpi.find_by_id(params[:id]).kpi_properties.all)
      render :json => @kpi_properties
    end
  end
end
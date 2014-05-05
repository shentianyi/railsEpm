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
      @kpi_properties =KpiPropertyPresenter.init_json_presenters(Kpi.find_by_id(params[:id]).kpi_properties)
      render :json => @kpi_properties
    end

    #alias_method :group_properties,:properties
    def group_properties
      @properties=KpiPropertyValue.by_kpi_id(params[:id]).all
      render json: KpiPropertyPresenter.to_group_select(@properties)
    end

  end
end
module Api
class KpisController < ApiController
  def kpis_by_category
    get_kpis_by_category(params[:id])
    respond_to do |t|
      t.json {render :json=>@kpis}
      t.js {render :js=>jsonp_str(@kpis)}
    end
  end
end
end
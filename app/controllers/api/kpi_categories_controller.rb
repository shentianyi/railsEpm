module Api
class KpiCategoriesController < ApiController
  def index
     get_ability_category
     respond_to do |t|
       t.json {render :json=>@categories}
       t.js {render :js=>jsonp_str(@categories)}
     end
  end
end
  end

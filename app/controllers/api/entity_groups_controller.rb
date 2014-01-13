class Api::EntityGroupsController < ApplicationController
  def index
    get_user_entity_groups
    egs= @entity_groups.select('id,name,is_public,description,code,user_id').all
    respond_to do |t|
      t.json {render :json=>egs}
      t.js {render :js=>jsonp_str(egs)}
    end
  end

 def contacts
   avatar_url="http://#{request.host}:#{request.port}/avatars/"
   contacts=EntityGroup.find_by_id(params[:id]).contacts.select('contacts.id,contacts.name,tel,phone,email,title,image_url').each{|c| c.image_url=avatar_url+c.image_url}
    respond_to do |t|
      t.json {render :json=>contacts}
      t.js {render :js=>jsonp_str(contacts)}
    end
 end
 
 def kpis
   kpis=Kpi.joins(:user_kpi_items).where(user_kpi_items:{entity_id:EntityGroupItem.where(entity_group_id:params[:id]).pluck(:entity_id)})
   .uniq.select('kpis.id,name,description,kpis.target_max,kpis.target_min,kpi_category_id,kpis.frequency')
   respond_to do |t|
      t.json {render :json=>kpis}
      t.js {render :js=>jsonp_str(kpis)}
    end
 end
end

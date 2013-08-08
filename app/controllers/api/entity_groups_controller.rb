class Api::EntityGroupsController < ApplicationController
  def index
    get_user_entity_groups
    respond_to do |t|
      t.json {render :json=>@entity_groups}
      t.js {render :js=>jsonp_str(@entity_groups)}
    end
  end


  def show

  end

  def destroy

  end

  def create

  end



end

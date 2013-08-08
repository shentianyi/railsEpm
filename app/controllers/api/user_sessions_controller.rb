class Api::UserSessionsController < ApplicationController 
  def create
    result = {:result=>false}
    @user_session = UserSession.new(params[:user_session])
    if @user_session.save
         result[:result]=true
    end
    respond_to do |t|
      t.json {render :json=>result}
      t.js {render :js=>jsonp_str(result)}
    end
  end


  def destroy
    result = {:result=>true}
    current_user_session.destroy
    respond_to do |t|
      t.json {render :json=>result}
      t.js {render :js=>jsonp_str(result)}
    end

  end
end

#encoding: utf-8
module Api
  class UserSessionsController < ApiController
    before_filter :require_no_user, :only => :create
    skip_before_filter :require_user, :only => :create
    skip_before_filter :require_active_user, :only => :create
    skip_before_filter :find_current_user_tenant, :only => :create
    skip_before_filter :check_tenant_status, :only => :create
    skip_before_filter :require_user_as_director
    skip_authorize_resource :only => :create

    def create
      result = {:result => false}
      @user_session = UserSession.new(params[:user_session])
      if @user_session.save
        result[:result]=true
      end
      respond_to do |t|
        t.json { render :json => result }
        t.js { render :js => jsonp_str(result) }
      end
    end


    def destroy
      result = {:result => true}
      current_user_session.destroy
      respond_to do |t|
        t.json { render :json => result }
        t.js { render :js => jsonp_str(result) }
      end
    end
  end
end

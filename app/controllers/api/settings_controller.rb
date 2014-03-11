#encoding: utf-8
module Api
  class SettingsController < ApiController
    skip_before_filter :require_no_user
    skip_before_filter :require_user
    skip_before_filter :require_active_user
    skip_before_filter :find_current_user_tenant
    skip_before_filter :check_tenant_status
    skip_before_filter :require_user_as_director
    skip_authorize_resource

    def validate_ios_app_version
      render json: {result: Setting.ios_app_version_is_old(params[:version])}
    end
  end
end

#encoding: utf-8
class AvatarsController < ApplicationController
  skip_before_filter :require_user
  skip_before_filter :require_active_user
  skip_before_filter :check_tenant_status
  skip_before_filter :find_current_user_tenant
  before_filter :require_no_user

  skip_load_and_authorize_resource

  def show
    send_file File.join($AVATARPATH, params[:id]+'.'+params[:format])
  end
end

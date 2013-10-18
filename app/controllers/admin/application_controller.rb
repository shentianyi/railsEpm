#encoding: utf-8
class Admin::ApplicationController < ActionController::Base
  layout 'admin_application'
  include Admin::ApplicationHelper
  include Admin::FileHelper
  before_filter :require_admin
  protected
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end

  #need login
  def require_admin
    if current_user.nil? || !current_user.is_sys
      flash[:alert] = "You must be logged in to access this page"
      redirect_to new_admin_session_path
    return false
    end
  end

  def model
    self.class.name.gsub(/Controller/,'').classify.constantize
  end
end


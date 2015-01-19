#encoding: utf-8
class Admin::ApplicationController < ActionController::Base
  layout 'admin_application'
  include Admin::FileHelper
  include ErrorHelper
  before_filter :authenticate_user!
  before_filter :require_admin

  #need login
  def require_admin
    if current_user.nil? || !current_user.is_sys
      error_page_403
    end
  end

  def model
    self.class.name.gsub(/Controller/, '').classify.constantize
  end
end


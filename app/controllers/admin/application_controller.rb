#encoding: utf-8
class Admin::ApplicationController < ActionController::Base
   layout 'admin_application'
   include Admin::ApplicationHelper
   include Admin::FileHelper
   
end


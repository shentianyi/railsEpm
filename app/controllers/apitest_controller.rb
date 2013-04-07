# encoding : utf-8
class ApitestController < ApplicationController
  # protect_from_forgery
  
  before_filter  :authenticate, :except=>:new_session
  
  def new_session
    if params[:user]=="epm" and params[:pwd]=="123"
      session[:userId]="epm"

      render :json => [{ :loginStatusCode=>$logOK, :authStatusCode=>$authOK }]
    else
      reset_session
      render :json => [{ :loginStatusCode=>$logFail, :authStatusCode=>$authFail }]
    end
  end
  
  def api
    if session[:userId]=="epm"
      id = params[:id] || "空值"
      name = params[:name] || "空值"
      render :json => @auth_head + [{ :flag=>true, :sys=>"epm", :id=>id, :name=>name }]
    end
    
  end
  
  def test
      render :json => [
        { :loginStatusCode=>$logOK, :authStatusCode=>$authFail },
        { :flag=>1, :msg=>"first api" }
      ]
  end
end

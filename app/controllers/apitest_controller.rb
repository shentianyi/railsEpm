# encoding : utf-8
class ApitestController < ApplicationController
  # protect_from_forgery
  
  before_filter  :authenticate, :except=>:new_session
  
  def new_session
    if params[:user]=="epm" and params[:pwd]=="123"
      session[:userId]="epm"

      render :json => [
        { :loginStatusCode=>$loginOK, :authStatusCode=>$authOK }
      ]
    else
      reset_session
      render :json => [
        { :loginStatusCode=>$loginFail, :authStatusCode=>$authFail }
      ]
    end
  end
  
  def api
    if session[:userId]=="epm"
      id = params[:id] || "空值"
      name = params[:name] || "空值"
      render :json => [
        { :loginStatusCode=>$loginOK, :authStatusCode=>$authOK },
        { :flag=>true, :sys=>"epm", :id=>id, :name=>name }
      ]
    end
    
  end
  
  def test
      render :json => [
        { :loginStatusCode=>$loginOK, :authStatusCode=>$authFail },
        { :flag=>1, :msg=>"first api" }
      ]
  end
end

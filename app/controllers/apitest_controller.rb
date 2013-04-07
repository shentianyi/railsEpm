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
  
  def testAPI1
    sleep 5
    render :json => {:imgUrl=>"http://localhost:3000/1.jpg"}
  end
  
  def testAPI2
    sleep 10
    render :json => {:imgUrl=>"http://localhost:3000/2.jpg"}
  end
  
  def testAPI3
    sleep 15
    render :json => {:imgUrl=>"http://localhost:3000/3.jpg"}
  end
  
  def testAPI4
    sleep 20
    render :json => {:imgUrl=>"http://localhost:3000/4.jpg"}
  end
  
  def test
      render :json => [
        { :loginStatusCode=>$logOK, :authStatusCode=>$authFail },
        { :flag=>1, :msg=>"first api" }
      ]
  end
end

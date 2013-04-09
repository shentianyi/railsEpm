# encoding : utf-8
class ApitestController < ApplicationController
  # protect_from_forgery
  
  # before_filter  :authenticate
  before_filter  :authenticate, :only=>:api 
  
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
    render :json => {:imgUrl=>"http://192.168.0.21:8080/1.jpg"}
  end
  
  def testAPI2
    sleep 10
    render :json => {:imgUrl=>"http://192.168.0.21:8080/2.jpg"}
  end
  
  def testAPI3
    sleep 15
    render :json => {:imgUrl=>"http://192.168.0.21:8080/3.jpg"}
  end
  
  def testAPI4
    sleep 20
    render :json => {:imgUrl=>"http://192.168.0.21:8080/4.jpg"}
  end
  
  def test
      render :json => [
        { :loginStatusCode=>$logOK, :authStatusCode=>$authFail },
        { :flag=>1, :msg=>"first api" }
      ]
  end
end

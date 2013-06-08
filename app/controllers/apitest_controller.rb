# encoding : utf-8
class ApitestController < ApplicationController
  # protect_from_forgery
  
  # before_filter  :authenticate
  skip_before_filter  :authenticate
  
  # [功能：] 图片测试，现已无用。
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

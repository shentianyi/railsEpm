# encoding : utf-8
class ApitestController < ActionController::Base
  # protect_from_forgery
  
  def new_session
    if params[:user]=="epm" and params[:pwd]=="123"
      session[:id]="epm"
      render :json => {:flag=>true}
    else
      reset_session
      render :json => {:flag=>false}
    end
  end
  
  def api
    if session[:id]=="epm"
      id = params[:id] || "空值"
      name = params[:name] || "空值"
      render :json => { :flag=>true, :sys=>"epm", :id=>id, :name=>name }
    else
      render :json => { :flag=>false }
    end
    
  end
  
  def test
    render :json => { :flag=>1, :msg=>"first api" }
  end
end

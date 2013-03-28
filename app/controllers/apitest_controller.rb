# encoding : utf-8
class ApitestController < ActionController::Base
  # protect_from_forgery
  
  def api
    id = params[:id] || "空值"
    name = params[:name] || "空值"
    render :json => "epm: #{id}, #{name}. "
  end
  
  def test
    render :json => { :flag=>1, :msg=>"first api" }
  end
end

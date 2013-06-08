# encoding : utf-8
class BackgroundController < ApplicationController
  
  # [功能：] 设置后台的 cron 定时器。
  def set_cron_time
    time = params[:timeInterval].to_i
    render :text => Tool::Cron.set_time( :min, time )
  end

end

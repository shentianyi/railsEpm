# encoding : utf-8
class BackgroundController < ApplicationController
  
  def set_cron_time
    time = params[:timeInterval].to_i
    render :text => Tool::Cron.set_time( :min, time )
  end

end

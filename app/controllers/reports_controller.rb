class ReportsController < ApplicationController
  skip_authorize_resource

  def index
    puts params[:part]
    case params[:part]
      when 'current-status'
        @partial = 'current-status'
      when 'daily-dpv'
        @partial = 'daily-dpv'
      else
        @partial = 'current-status'
    end
    # snaps
    #@partial='grid'
    @snaps=current_user.report_snaps.where(type_string: 'current-status').order('created_at desc').all
    render :partial => @partial if params[:ajax]
  end
end

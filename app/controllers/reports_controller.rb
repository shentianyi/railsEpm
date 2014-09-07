class ReportsController < ApplicationController
  skip_authorize_resource

  def index
    case params[:part]
      when 'grid'
        @partial = 'grid'
      when 'data-view'
        @partial = 'data-view'
      else
        @partial = 'data-view'
    end
    # snaps
    #@partial='grid'
    @snaps=current_user.report_snaps.where(type_string: 'current-status').order('created_at desc').all
    render :partial => @partial if params[:ajax]
  end
end

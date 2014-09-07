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

    render :partial => @partial if params[:ajax]
  end
end

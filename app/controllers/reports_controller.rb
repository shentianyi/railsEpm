class ReportsController < ApplicationController
  skip_authorize_resource

  def index
    @partial = ChartType.partial(params[:part].to_i)
    # snaps
    #@partial='grid'
    @users=User.where('id <> ?', current_user.id).where(role_id: Role.director).all
    @snaps=current_user.report_snaps.where(type_string: 1).order('created_at desc').all
    render :partial => @partial if params[:ajax]
  end
end

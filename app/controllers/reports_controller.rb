class ReportsController < ApplicationController
  skip_authorize_resource

  def index
    params[:part] = '1' unless params.has_key? 'part'
    @partial = ChartType.partial(params[:part].to_i)
    # snaps
    #@partial='grid'
    @users=User.where('id <> ?', current_user.id).where(role_id: Role.director).all
    @snaps=current_user.report_snaps.where(type: params[:part]).order('created_at desc').all
    render :partial => @partial if params[:ajax]
  end

  def subscription
    render :partial => "subscription"
  end


  def demo
    render
  end

end

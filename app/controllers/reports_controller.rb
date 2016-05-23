class ReportsController < ApplicationController
  skip_authorize_resource

  def index
    if params[:from_ipad].present? && params[:ajax].blank?
      @from_ipad=true
      @part=params[:part]
      @entity_group_id=params[:entity_group_id]
      respond_to do |format|
        format.html { render 'ipad', :layout => 'app_application' }
        format.json
      end
    else

    end

    if params[:ajax]
      params[:part] = '1' unless params.has_key? 'part'
      @partial = ChartType.partial(params[:part].to_i)
      # snaps
      #@partial='grid'
      #@users=User.where('id <> ?', current_user.id).where(role_id: Role.director).all
      #@snaps=current_user.report_snaps.where(type: params[:part]).order('created_at desc').all
      render :partial => @partial
    end
  end


  def subscription
    render :partial => "subscription"
  end

  def demo
    render
  end

end

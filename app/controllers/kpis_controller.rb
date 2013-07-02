#encoding: utf-8
class KpisController < ApplicationController
  # show kpis by category
  def index
    @categories=KpiCategory.all
    unless @category=KpiCategory.find_by_id(params[:category])
      @category=@categories[0]
    end
    render :json=>[@categories,@category.kpis]
  end

  def new
    @categories=KpiCategory.all
    @units=KpiUnit.all
    @frequencies=KpiFrequency.all
    @directions=KpiDirection.all
    render :partial=>'new'
  end

  # create api
  def create
    if request.post?
      @kpi=Kpi.new(:name=>params[:kpi])
    if @kpi.save

    end
    end
  end

  # edit kpi
  def edit
    @kpi=Kpi.find(params[:id])
  end

  # update kpi
  def update

  end

  # delete kpi
  def destroy
	  if @kpi=Kpi.find_by_id(params[:id])
		  if @kpi.kpi_parents.count==0
			  @kpi.destroy
		  else
			  render :json=>'can not destroy, as basci kpi'
		  end
	  end
  end

  def assign
  end
end

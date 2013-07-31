#encoding: utf-8
class KpiCategoriesController < ApplicationController
  before_filter :get_ability_category,:only=>[:update,:destroy]
  def new
    render :partial=>'new'
  end

  def create
    @category=KpiCategory.new(params[:category])
    @category.tenant=current_tenant
    msg=Message.new
    if @category.save
    msg.result=true
    msg.object=@category.id
    else
      msg.content=@category.errors.messages.values.join('; ')
    end
    render :json=>msg
  end

  def update
    if @category
      render :json=>@category.update_attributes(params[:data])
    end
  end

  def destroy
    msg=Message.new
    if @category and @category.kpi_quantity==0
     msg.result=@category.destroy
     else
       msg.content="类别不可删除，包含KPI"
    end
    render :json=>msg
  end
 
  private
  #冗余
  def get_ability_category
    @category=KpiCategory.accessible_by(current_ability).find_by_id(params[:id])
  end
end
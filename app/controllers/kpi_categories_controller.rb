#encoding: utf-8
class KpiCategoriesController < ApplicationController
  before_filter :get_ability_category, :only=>[:destroy]
  before_filter :get_ability_category_by_id,:only=>[:update,:destroy]
  def new
    render :partial=>'new'
  end

  def create
    @category=KpiCategory.new(params[:data])
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
    #can't destroy the last category
    if @categories.length > 1
      if @category and @category.kpi_quantity==0
        msg.result=@category.destroy
      else
        msg.content="类别不可删除，包含KPI"
      end
    else
      msg.content="必须保留一个类别"
    end
    render :json=>msg
  end

  def list
   render :json=>get_ability_category
  end
  def template
    @admin_kpi_category_templates = Admin::KpiCategoryTemplate.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @admin_kpi_category_templates }
    end
  end
end
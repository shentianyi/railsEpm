#encoding: utf-8
class KpiCategoriesController < ApplicationController
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

  def edit
    @category=KpiCategory.find_by_id(params[:id])
  end

  def update
    @category=KpiCategory.find_by_id(params[:id])
    if @category and @category.update_attributes(params[:category])
      render :json=>true
    else
      render :json=>false
    end
  end

  def destroy
  end

  def assign
  end
end
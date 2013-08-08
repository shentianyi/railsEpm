# encoding: utf-8
class UserKpiItemsController < ApplicationController
  # update user kpi items
  def update
  if @user_kpi_item=UserKpiItem.find_by_id(params[:id])
      render :json=>@user_kpi_item.update_attributes(params[:user_kpi_item])
    end
  end

  # delete kpi
  def destroy
    msg=Message.new
    if @user_kpi_item=UserKpiItem.find_by_id(params[:id])
    msg.result= @user_kpi_item.destroy
    else
      msg.content='can not destroy'
    end
    render :json=>msg
  end
end

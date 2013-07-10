#encoding: utf-8
class EntitiesController < ApplicationController
  # get entity list
  def list
  end

  # create tenant
  def create
    @entity=Entity.new(params[:entity])
    @entity.tenant=current_tenant
    msg=Message.new
    if @entity.save
      msg.result=true
      msg.object=@entity.id
    else
      msg.content=@entity.errors.messages.values.join('; ')
    end
    render :json=>msg
  end

  # destroy tenant
  def destroy
  end
end

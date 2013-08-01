#encoding: utf-8
class EntitiesController < ApplicationController
    before_filter :get_ability_entity,:only=>[:update,:destroy]
 
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

  def update
    if @entity
      render :json=>@entity.update_attributes(params[:data])
    end
  end

  def destroy
    msg=Message.new
    if @entity 
     msg.result=@entity.destroy
     else
       msg.content="删除失败"
    end
    render :json=>msg
  end
   
end

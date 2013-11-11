#encoding: utf-8
class EntitiesController < ApplicationController
    before_filter :get_ability_entity,:only=>[:update,:destroy]

  #index
  def index
    @entities = Entity.all
    #find the all the users of active entity
    #if not find active ,first default
    @active_entity_id=params[:p].nil? ? @entities[0].id : params[:p].to_i
    @users=User.accessible_by(current_ability).where(:entity_id=>@active_entity_id).all
  end

  # create tenant
  def create
    @entity=Entity.new(params[:data])
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
    if @entity and @entity.users.count==0
     msg.result=@entity.destroy
     else
       msg.content="不可以删除"
    end
    render :json=>msg
  end
   
end

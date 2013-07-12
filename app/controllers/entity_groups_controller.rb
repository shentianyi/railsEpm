#encoding: utf-8
class EntityGroupsController < ApplicationController
  def index
    @entity_groups=current_user.entity_groups.accessible_by(current_ability)
    @group_entities=[]
    if @entity_groups.count>0
      @active_entity_group_id=params[:p].nil? ? @entity_groups[0].id : params[:p].to_i
      if @entity_group=  current_user.entity_groups.accessible_by(current_ability).where("entity_groups.id=?",@active_entity_group_id).first
        @user_group_entities=@entity_group.entities.select("entities.*,entity_group_items.id as 'entity_group_item_id'")
      end
    end
    @entities=Entity.accessible_by(current_ability)
  end

  # create api
  def create
    msg=Message.new
    @entity_group=EntityGroup.new(params[:entity_group])
    @entity_group.user=current_user
    if @entity_group.save
    msg.result=true
    msg.object=@entity_group.id
    else
      msg.content=@entity_group.errors.messages.values.join('; ')
    end
    render :json=>msg
  end

  # edit entity_group
  def edit
    @entity_group=EntityGroup.accessible_by(current_ability).find_by_id(params[:id])
  end

  # update entity_group
  def update
    if @entity_group=EntityGroup.accessible_by(current_ability).find_by_id(params[:id])
      render :json=>@entity_group.update_attributes(params[:data])
    end
  end

  # delete entity_group
  def destroy
    msg=Message.new
    if @entity_group=EntityGroup.accessible_by(current_ability).find_by_id(params[:id])
    @entity_group.destroy
    msg.result=true
    else
      msg.content='can not destroy'
    end
    render :json=>msg
  end
 

end

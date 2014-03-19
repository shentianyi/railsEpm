#encoding: utf-8
class EntityGroupsController < ApplicationController
  def index
    @entity_groups=get_user_entity_groups
    @group_entities=[]
    if @entity_groups.count>0
      @active_entity_group_id=params[:id].nil? ? @entity_groups[0].id : params[:id].to_i
      if @entity_group= EntityGroup.find_by_id(@active_entity_group_id) #current_user.entity_groups.accessible_by(current_ability).where("entity_groups.id=?",@active_entity_group_id).first
        @entity_group.can_modify = @entity_group.can_modify_by_user(current_user)
        @user_group_entities=@entity_group.entities.select("entities.*,entity_group_items.id as 'entity_group_item_id'")
        @entities=Entity.accessible_by(current_ability) #unless @entity_group.is_public
        @shared_users=@entity_group.shared_user
        @unshared_users=@entity_group.unshared_user
      end
    end
  end

  # create api
  def create
    msg=Message.new
    @entity_group=EntityGroup.new(params[:data])
    @entity_group.tenant=current_user_tenant
    @entity_group.creator=current_user
    if @entity_group.save
      msg.result=true
      msg.object=@entity_group.id
    else
      msg.content=@entity_group.errors.messages.values.join('; ')
    end
    render :json => msg
  end

  # edit entity_group
  def edit
    @entity_group=EntityGroup.accessible_by(current_ability).find_by_id(params[:id])
  end

  # update entity_group
  def update
    msg=Message.new
    if @entity_group=EntityGroup.find_by_id(params[:id])
      if msg.result = @entity_group.can_modify_by_user(current_user)
        msg.result =@entity_group.update_attributes(params[:data])
      end
    end
    render json: msg.result
  end

  # delete entity_group
  def destroy
    msg=Message.new
    if @entity_group=EntityGroup.accessible_by(current_ability).find_by_id(params[:id])
      if @entity_group.can_modify_by_user(current_user)
        @entity_group.destroy
        msg.result=true
      else
        msg.content = I18n.t "fix.cannot_destroy"
      end
    else
      msg.content=I18n.t "fix.cannot_destroy"
    end
    render :json => msg
  end

  def get_entity_groups
    get_user_entity_groups
    respond_to do |t|
      t.json { render :json => @entity_groups }
    end
  end
end

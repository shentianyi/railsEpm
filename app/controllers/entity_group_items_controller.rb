#encoding: utf-8
class EntityGroupItemsController < ApplicationController
  # create api
  def create
    msg=Message.new
    @entity_group_item=EntityGroupItem.new(params[:data])
    @entity_group_item.user=current_user
    if @entity_group_item.save
    msg.result=true
    msg.object=@entity_group_item.id
    else
      msg.content=@entity_group_item.errors.messages.values.join('; ')
    end
    render :json=>msg
  end

  # delete entity_group
  def destroy
    msg=Message.new
    if @entity_group_item=EntityGroupItem.accessible_by(current_ability).find_by_id(params[:id])
    @entity_group_item.destroy
    msg.result=true
    else
        msg.content=I18n.t "fix.cannot_destroy"
    end
    render :json=>msg
  end

end

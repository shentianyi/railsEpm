#encoding: utf-8
class DepartmentsController < ApplicationController
  skip_load_and_authorize_resource

  def index
    render
  end

  def create
    msg = Message.new
    msg.result = false
    @department = EntityGroup.new(params[:department])
    @department.user = current_user
    @department.is_public = true

    if !@department.save
      msg[:errors] = @department.errors.full_messages
    else
      msg[:result] = true
      msg[:object] = @department
    end
    render :json => msg
  end

  def destroy
    msg=Message.new
    if @entity_group=EntityGroup.accessible_by(current_ability).find_by_id(params[:id])
      if @entity_group.user_id == current_user.id
        @entity_group.destroy
        msg.result=true
      else
        msg.content = I18n.t "fix.cannot_destroy"
      end
    else
         msg.content=I18n.t "fix.cannot_destroy"
    end
    render :json=>msg
  end

  def add_entity
    #traversal all the parent node
    #and add the entity to them all
    msg = Message.new
    msg.result = true
    ActiveRecord::Base.transaction do
      @entity_group = EntityGroup.find(params[:id])
      @entity_group_item = EntityGroupItem.new(:entity_id=>paarms[:entity_id],:entity_group_id=>params[:id])
      if !@entity_group_item.save!
        msg.result = false
        msg.content = @entity_group_item.errors.full_messages
      end
      if @entity_group
        @entity_group.ancestor_ids.each do |id|
          @e = EntityGroupItem.new(:entity_id=>paarms[:entity_id],:entity_group_id=>id)
          if !@e.save!
            msg.result = false
          end
        end
      end
    end
  end
  msg.content =@entity_group_item
  render :json=>msg
end

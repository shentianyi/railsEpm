#encoding: utf-8
class DepartmentsController < ApplicationController

  def index
    @roots = Department.all.roots
    render
  end

  def create
    msg = Message.new
    msg.result = false
    parent = Department.find_by_id(params[:parent]) if params.has_key?(:parent)
    @department = Department.new(params[:department])
    @department.user = current_user
    if parent
      puts parent
      @department.parent = parent
    end
    if !@department.save
      msg.content = @department.errors.full_messages
    else
      msg.result = true
      msg.content = @department
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
      @entity_group_item = EntityGroupItem.new(:entity_id=>params[:entity_id],:entity_group_id=>params[:id])
      if !@entity_group_item.save!
        msg.result = false
        msg.content = @entity_group_item.errors.full_messages
      end
      if @entity_group
        @entity_group.ancestor_ids.each do |id|
          @e = EntityGroupItem.new(:entity_id=>params[:entity_id],:entity_group_id=>id,:is_visual=>false)
          if !@e.save!
            msg.result = false
          end
        end
      end
    end
    msg.content =@entity_group_item
    render :json=>msg
  end

  def remove_entity
    #traversal all the parent node
    #and remove all the entity of them
    msg = Message.new
    msg.result = true
    ActiveRecord::Base.transaction do
      EntityGroupItem.delete_all("entity_id = ?",params[:id])
    end
    render :json=>msg
  end

  def add_user
    msg = Message.new
    msg.result = false
    @entity_group = EntityGroup.find_by_id(params[:entity_group_id])
    @user = User.find_by_id(params[:user_id])

    if @entity_group && @user
      @user.entity_group_id = @entity_group.id
      msg.result = @user.save!
    else
    end
    render :json=>msg
  end

  def remove_user
    msg = Message.new
    msg.result = false
    @entity_group = EntityGroup.find_by_id(params[:entity_group_id])
    @user = User.find_by_id(params[:user_id])

    if @entity_group && @user
      @user.entity_group_id = nil
      msg.result = @user.save!
    else
    end
    render :json=>msg
  end

  def sub_departments
    msg = Message.new
    msg.result = false
    @entity_group = EntityGroup.find_by_id(params[:id])
    @sub_department = @entity_group.children
    msg.result = @sub_department.count > 0 ? true:false
    msg.content = {"id"=>params[:id],"subdeps"=>@sub_department}
    render :json=>msg
  end

  def sub_entities
    msg = Message.new
    msg.result = false
    @entities = EntityGroup.find_by_id(params[:id]).entities.where('entity_group_items.is_visual = true')
    if @entities.count > 0
      msg.result = true
    end

    msg.content = {"id"=>params[:id],"subents"=>@entities}
    render :json=>msg
  end

  def users
    msg = Message.new
    msg.result = false
    @users = User.find_by_entity_group_id(params[:id])
    mgs.result = true
    msg.content = @users
    render :json
  end

  def entity_users
    msg = Message.new
    msg.result = false
    @users = User.find_by_entity_id(params[:id])
    msg.result = true
    msg.content = @users
    render :json=>@users
  end
end

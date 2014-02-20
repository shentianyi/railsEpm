#encoding: utf-8
class DepartmentsController < ApplicationController

  def index
    @roots = Department.where("user_id = ?",current_user.id).roots
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
      ##create the add UserEntityGroup so that the owner can visit the entity group of this department

      #write code here

      ##end
      msg.content = @department.errors.full_messages
    else
      msg.result = true
      msg.content = @department
    end
    render :json => msg
  end

  def destroy
    msg=Message.new
    if @department=Department.accessible_by(current_ability).find_by_id(params[:id])
      if @department.user_id == current_user.id
        @department.destroy
        msg.result=true
      else
        msg.content = I18n.t "fix.cannot_destroy"
      end
    else
         msg.content=I18n.t "fix.cannot_destroy"
    end
    render :json=>msg
  end

  # add entity to the department and to the entity group at the same time
  def add_entity
    #traversal all the parent node
    #and add the entity to them all
    msg = Message.new
    msg.result = true
    #ActiveRecord::Base.transaction do
    #  @entity_group = Department.find_by_id(params[:id])
    #  @entity_group_item = EntityGroupItem.new(:entity_id=>params[:entity_id],:entity_group_id=>params[:id])
    #  if !@entity_group_item.save!
    #    msg.result = false
    #    msg.content = @entity_group_item.errors.full_messages
    #  end
    #  if @entity_group
    #    @entity_group.ancestor_ids.each do |id|
    #      @e = EntityGroupItem.new(:entity_id=>params[:entity_id],:entity_group_id=>id,:is_visual=>false)
    #      if !@e.save!
    #        msg.result = false
    #      end
    #    end
    #  end
    #end

    entity = Entity.find_by_id(params[:entity_id])
    department = Department.find_by_id(params[:id])
    #add entity to all the ancestors of this department
    if entity&&department
      entity.department_id = department.id
      entity_group_item = EntityGroupItem.new(:entity_id => entity.id,:entity_group_id=>department.entity_group.id)
      entity_group_item.save
      #create the entitygroupitem
      department.ancestors.each do |d|
        entity_group_item = EntityGroupItem.new(:entity_id => entity.id,:entity_group_id=>d.entity_group.id)
        entity_group_item.save
      end
      #end
      msg.result = entity.save
    else

    end

    render :json=>msg
  end

  # remove entity from department ,and the entity group as well
  def remove_entity
    #traversal all the parent node
    #and remove all the entity of them
    msg = Message.new
    msg.result = true
    ActiveRecord::Base.transaction do
      entity = Entity.find_by_id(prams[:entity_id])
      entity.department_id = nil
      department = Department.find_by_id(params[:id])
      EntityGroupItem.delete_all("entity_id = ? AND entity_group_id = ?",entity.id,department.entity_group.id)

      department.ancestors.each do |d|
        EntityGroupItem.delete_all("entity_id = ? AND entity_group_id = ?",entity.id,d.entity_group.id)
      end
    end
    render :json=>msg
  end

  #add user to the department
  #and create the user_entity_group to let the user can read
  def add_user
    msg = Message.new
    msg.result = false
    user_department = UserDepartment.new(:user_id => params[:user_id],:department_id => params[:id])
    if !(msg.result = user_department.save)
      msg.content = user_department.errors.full_messages
    end

    render :json=>msg
  end

  #remove user from department
  #remove the entity group as well
  def remove_user
    msg = Message.new
    msg.result = false

    if user_department = UserDepartment.where("user_id = ? AND department_id = ?",params[:user_id],params[:department_id])
      user_department.destroy
      msg.result = true
    end
    render :json=>msg
  end

  def sub_departments
    msg = Message.new
    msg.result = false
    @department = Department.find_by_id(params[:id])
    @sub_departments = @department.children
    msg.result = @sub_departments.count > 0 ? true:false
    msg.content = {"id"=>params[:id],"subdeps"=>@sub_departments}
    render :json=>msg
  end

  def sub_entities
    msg = Message.new
    msg.result = false
    @entities = Department.find_by_id(params[:id]).entities
    if @entities.count > 0
      msg.result = true
    end

    msg.content = {"id"=>params[:id],"subents"=>@entities}
    render :json=>msg
  end

  def users
    msg = Message.new
    msg.result = false
    #@users = User.find_by_entity_group_id(params[:id])
    mgs.result = true
    msg.content = @users
    render :json
  end

  def entity_users
    msg = Message.new
    msg.result = false
    #@users = User.find_by_entity_id(params[:id])
    msg.result = true
    msg.content = @users
    render :json=>@users
  end
end

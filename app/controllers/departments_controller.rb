#encoding: utf-8
class DepartmentsController < ApplicationController

  def index
    @roots = Department.roots
    render
  end

  def show
    @root = Department.roots.first
  end

  def jsontree
    msg = Message.new
    msg.result = true
    if (d = Department.find_by_id(params[:id]))
      msg.content = Department.json_tree(d.subtree.arrange)
    end

    render :json => msg
  end

  def create
    msg = Message.new
    msg.result = false
    parent = Department.find_by_id(params[:parent]) if params.has_key?(:parent)
    @department = Department.new(params[:department])
    @department.creator = current_user
    if parent
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

  def update
    msg = Message.new
    msg.result = true

    @department = Department.find_by_id(params[:id])
    msg.result = @department.update_attributes(params[:department])
    render :json => msg
  end

  def destroy
    msg=Message.new
    if @department=Department.accessible_by(current_ability).find_by_id(params[:id])
      if @department.root?
        msg.content=I18n.t "fix.cannot_destroy"
      else
        if @department.user_id == current_user.id
          ActiveRecord::Base.transaction do
            @department.entities.all.each do |e|
              e.department.path.each do |d|
                if entity_group_item = EntityGroupItem.find_by_entity_id_and_entity_group_id(e.id, d.entity_group.id)
                  entity_group_item.destroy
                end
              end
            end

            @department.destroy
          end
          msg.result=true
        else
          msg.content = I18n.t "fix.cannot_destroy"
        end
      end
    else
      msg.content=I18n.t "fix.cannot_destroy"
    end
    render :json => msg
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
      previous_dept = entity.department

      entity.update_attribute("department_id", department.id)
      #delete all the entity_group_itmes
      #if !previous_dept.nil?
      #  if entity_group_item = EntityGroupItem.find_by_entity_id_and_entity_group_id(entity.id,previous_dept.entity_group.id)
      #    entity_group_item.destroy
      #  end
      #
      #  previous_dept.ancestors.each do |d|
      #    if entity_group_item = EntityGroupItem.find_by_entity_id_and_entity_group_id(entity.id,d.entity_group.id)
      #      entity_group_item.destroy
      #    end
      #  end
      #end

      #create all the entity_group_item for new
      #entity_group_item = EntityGroupItem.new(:entity_id => entity.id,:entity_group_id=>department.entity_group.id)
      #entity_group_item.save

      #create the entitygroupitem
      #department.ancestors.each do |d|
      #  entity_group_item = EntityGroupItem.new(:entity_id => entity.id,:entity_group_id=>d.entity_group.id)
      #  entity_group_item.save
      #end
      #end
      msg.result = entity.save
    else

    end

    render :json => msg
  end

  # remove entity from department ,and the entity group as well
  def remove_entity
    #traversal all the parent node
    #and remove all the entity of them
    msg = Message.new
    msg.result = true
    ActiveRecord::Base.transaction do
      entity = Entity.find_by_id(params[:entity_id])

      #previous_dept = entity.department

      #entity.department_id = nil
      #if entity.update_attribute("department_id",nil)
      #if entity_group_item = EntityGroupItem.find_by_entity_id_and_entity_group_id(entity.id,previous_dept.entity_group.id)
      #entity_group_item.destroy
      #end

      #previous_dept.ancestors.each do |d|
      #  if entity_group_item = EntityGroupItem.find_by_entity_id_and_entity_group_id(entity.id,d.entity_group.id)
      #   entity_group_item.destroy
      # end
      #end
      #end
      msg.result = entity.update_attribute("department_id", nil)
    end
    render :json => msg
  end

  #add user to the department
  #and create the user_entity_group to let the user can read
  def add_user
    msg = Message.new
    msg.result = false
    if User.find_by_id(params[:user_id]) && Department.find_by_id(params[:id])
      validator = DepartmentValidator.new({:user_id => params[:user_id], :department_id => params[:id]})
      validator.valid_add_user
      if validator.valid
        user_department = UserDepartment.new(:user_id => params[:user_id], :department_id => params[:id])
        if !(msg.result = user_department.save)
          msg.content = user_department.errors.full_messages
        end
      else
        msg.content = validator.content
      end
    end

    render :json => msg
  end

  #remove user from department
  #remove the entity group as well
  def remove_user
    msg = Message.new
    msg.result = false

    if user_department = UserDepartment.where("user_id = ? AND department_id = ?", params[:user_id], params[:department_id]).first
      user_department.destroy
      msg.result = true
      msg.content = params[:user_id]
    end
    render :json => msg
  end

  def sub_departments
    msg = Message.new
    msg.result = false
    @department = Department.find_by_id(params[:id])
    @sub_departments = @department.children
    msg.result = @sub_departments.count > 0 ? true : false
    msg.content = {"id" => params[:id], "subdeps" => @sub_departments}
    render :json => msg
  end

  def sub_entities
    msg = Message.new
    msg.result = false
    @entities = Department.find_by_id(params[:id]).entities
    if @entities.count > 0
      msg.result = true
    end

    msg.content = {"id" => params[:id], "subents" => @entities}
    render :json => msg
  end

  def users
    msg = Message.new
    msg.result = false
    #@users = User.find_by_entity_group_id(params[:id])
    @users = Department.find_by_id(params[:id]).users
    msg.result = true
    msg.content = @users
    render :json => msg
  end

  def entity_users
    msg = Message.new
    msg.result = false
    #@users = User.find_by_entity_id(params[:id])
    msg.result = true
    msg.content = @users
    render :json => @users
  end

  #get the entities not in this department
  def valid_entities
    msg = Message.new
    msg.result = false
    @entities = Entity.where("department_id != ? OR department_id IS NULL", params[:id])
    msg.result = true
    msg.content = @entities
    render :json => msg
  end

  #get all the users not in this department
  def valid_users
    msg = Message.new
    msg.result = false
    ids = Department.find_by_id(params[:id]).users.pluck(:id)
    if ids.count > 0

    else
      ids = 0
    end
    @users = User.where("role_id != ? AND id NOT IN (?)", 100, ids)
    msg.result = true
    msg.content = @users
    render :json => msg
  end

  def entity_groups
    parent=Department.find_by_id(params[:product_line])
    kpi=Kpi.first#.find_by_name(Settings.app.kpi)
    entity_groups=[]

    frequency=params[:interval].blank? ? KpiFrequency::Daily : params[:interval].to_i

    start_time=KpiFrequency.get_begin_date(Time.now,frequency)
    end_time=KpiFrequency.get_next_date(start_time,frequency)-1.second


    parent.children.each do |d|
      entity_group=d.entity_group
      params={}
      params[:kpi_id]=kpi.id
      params[:kpi_name]=kpi.name
      params[:entity_group_id]=entity_group.id
      params[:entity_group_name]=entity_group.name
      params[:start_time]=start_time.utc.to_s
      params[:end_time]=end_time.utc.to_s

      params[:frequency]=frequency
      params[:average]=true #=.nil? ? true : params[:average]=='true'
      data=Entry::Analyzer.new(params).analyse #.to_json

      p '-------------------------------'
      p params
      p data
      p '-------------------------------'


      max=kpi.target_max
      min=kpi.target_min

      if entity=d.entities.first
        if user= entity.users.first
          if item=user.user_kpi_items(kpi_id: kpi.id).first
            max=item.target_max
            min=item.target_min
          end
        end
      end

      entity_groups<<{
          id: entity_group.id,
          name: entity_group.name,
          code: entity_group.code,
          value: data[:current].first,
          target_max: max,
          target_min: min,
          d: data
      }
    end
    render json: entity_groups
  end
end

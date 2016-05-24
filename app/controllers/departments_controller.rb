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

  def cycle_kpi_data
    render json: get_on_off_kpi_data(Kpi.cycle_time).values
  end

  def moving_kpi_data
    render json: get_on_off_kpi_data(Kpi.moving_time).values
  end

  def cycle_and_moving_kpi_data
    cycle_data=get_on_off_kpi_data(Kpi.cycle_time)
    moving_data=get_on_off_kpi_data(Kpi.moving_time)
    datas=[]
    cycle_data.each do |k, v|
      datas<<{
          id: v[:id],
          name: v[:name],
          code: k,
          cycle_time: v[:value],
          cycle_count: v[:count],
          moving_time: moving_data[k][:value],
          moving_count: moving_data[k][:count],
          target_max: v[:target_max],
          target_min: v[:target_min]
      }
    end
    render json: datas
  end

  def cycle_kpi_history
    get_on_off_kpi_history(Kpi.cycle_time)
  end

  def moving_kpi_history
    get_on_off_kpi_history(Kpi.moving_time)
  end


  def scram_kpi_data
    kpi=Kpi.scram_time
    start_time=Time.parse(params[:start_time]).utc
    end_time=Time.parse(params[:end_time]).utc

    q=KpiEntry.where(kpi_id: kpi.id)
    q=q.between(Hash[:entry_at, (start_time..end_time)])
    entities=q.distinct(:entity_id)

    datas=[]
    entities.each do |entity_id|


      if (e=Entity.find_by_id(entity_id)) &&(eg=e.department.entity_group)
        entriesq=KpiEntry.where(kpi_id: Kpi.scram_time.id, entity_id: entity_id)
                     .between(Hash[:entry_at, (start_time..end_time)])
        entries=[]
        entriesq.each do |entry|
          entries<<{
              id: entry._id.to_s,
              start_time: entry.from_time,
              end_time: entry.to_time,
              wait_time: KpiUnit.parse_entry_value(kpi.unit, entry.value)
          }
        end
        datas<<{
            id: eg.id,
            name: eg.name,
            code: eg.code,
            scram_value: entries
        }
      end
    end
    render json:datas
  end


  def download_cycle_time_detail
    msg = FileHandler::Excel::AppCenterHandler.download_cycle_time_detail(params, Kpi.cycle_time)
    if msg.result
      send_file msg.content
    else
      render json: msg
    end
  end

  def product_line_list
    data=[]

    list=DisplaySetList.find_by_name(Time.parse(params[:date]).to_date)
    if list
      list.display_set_items.order('department_id asc').each do |d|
        data<<{
            id: d.department.id,
            name: d.department.name,
            cn_name: d.department.cn_name
        }
      end
    end
    puts data

    render json: data
  end


  def get_on_off_kpi_data(kpi)
    product_line=Department.find_by_id(params[:product_line])
    #kpi=Kpi.first #.find_by_name(Settings.app.kpi)
    datas={}

    frequency=params[:interval].blank? ? KpiFrequency::Daily : params[:interval].to_i
    start_time=nil
    end_time=nil
    if params[:start_time].present?
      start_time=Time.parse(params[:start_time]).utc
      end_time=Time.parse(params[:end_time]).utc
    else

      start_time=(KpiFrequency.get_begin_date(Time.now, frequency).utc)
      end_time=(KpiFrequency.get_next_date(start_time, frequency)-1.second).utc
    end


    entity_group_ids=product_line.children.joins(:entity_group).pluck('entity_groups.id')
    params={}
    params[:kpi_id]=kpi.id
    params[:kpi_name]=kpi.name
    params[:entity_group_id]=entity_group_ids
    params[:start_time]=start_time.to_s
    params[:end_time]=end_time.to_s
    params[:entity_group_single_entity]=true
    params[:frequency]=frequency
    params[:average]=true
    data=Entry::Analyzer.new(params).analyse
    p '----------------------------'
    p data
    p '-----------------------------'
    max=kpi.target_max
    min=kpi.target_min
    data[:current].each do |d|
      if (e=Entity.find_by_id(d['entity_id'])) && (de=e.department) &&(eg=de.entity_group)
        datas[eg.code]= {
            id: eg.id,
            name: eg.name,
            code: eg.code,
            value: d['value'],
            count: d['count'],
            target_max: max,
            target_min: min
        }
      end
    end

    datas
  end


  def get_on_off_kpi_history(kpi)

    entries=[]
    if (eg=EntityGroup.find_by_id(params[:id])) && (e=eg.entities.last)
      q = KpiEntry.where(kpi_id: kpi.id,
                         entity_id: e.id)
      start_time=Time.parse(params[:start_time]).utc #.to_s
      end_time=(Time.parse(params[:end_time])-1.second).utc #.to_s
      q=q.between(Hash[:entry_at, (start_time..end_time)])

      q=q.order_by(entry_at: :desc)

      q.each do |entry|
        entries<<{
            id: entry._id.to_s,
            value: KpiUnit.parse_entry_value(kpi.unit, entry.value),
            entry_at: entry.entry_at,
            target_max: kpi.target_max,
            target_min: kpi.target_min
        }
      end
    end

    if e
      render json: {
          id: eg.id,
          name: eg.name,
          data: entries
      }
    else
      render json: nil
    end
  end

end
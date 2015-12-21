#encoding: utf-8
class DepartmentPresenter<Presenter
  Delegators=[:id, :name, :description, :user_id, :created_at, :updated_at]
  def_delegators :@department, *Delegators

  def initialize(department)
    @department=department
    self.delegators =Delegators
  end


  def as_basic_feedback(messages=nil, result_code=nil)
    {
        result_code: result_code||1,
        messages: messages,
        need_instruction: false,
        customized_field: result_code==1 ? as_user_department : nil
    }
  end

  def as_brief_info(with_members=true)
    {
        id: @department.id,
        name: @department.name,
        description: @department.description,
        creator_id: @department.user_id,
        parent_id: @department.parent_id,
        has_children: @department.has_children?,
        members: with_members ? @department.users.limit(5).pluck(:nick_name) : nil
    }
  end

  def self.as_brief_infos(departments,with_members=true)
    infos=[]
    departments.each do |department|
      infos<<DepartmentPresenter.new(department).as_brief_info(with_members)
    end
    infos
  end

  def as_user_department(user=nil)
    {
        managable: user.nil? ?  true : @department.manageable(user), #@department.is_manager,
        department: as_brief_info
    }
  end

  def self.as_user_departments(departments, user=nil)
    infos=[]
    departments.each do |department|
      infos<<self.new(department).as_user_department(user)
    end
    infos
  end

  def as_kpi_department
    {
        follow_flag: "NONE",
        department: as_brief_info
    }
  end

  def self.as_kpi_departments(departments)
    infos=[]
    departments.each do |department|
      infos<<self.new(department).as_kpi_department
    end
    infos
  end
end

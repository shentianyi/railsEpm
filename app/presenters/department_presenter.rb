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
        customized_field: as_brief_info
    }
  end

  def as_brief_info
    {
        id: @department.id,
        name: @department.name,
        description: @department.description,
        creator_id: @department.user_id,
        parent_id: @department.parent_id,
        has_children: @department.has_children?
    }
  end

  def self.as_brief_infos(departments)
    infos=[]
    departments.each do |department|
      infos<<DepartmentPresenter.new(department).as_brief_info
    end
    infos
  end

end

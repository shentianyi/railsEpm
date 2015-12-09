#encoding: utf-8
class DepartmentPresenter<Presenter
  Delegators=[:id, :name, :description, :user_id, :created_at, :updated_at]
  def_delegators :@department, *Delegators

  def initialize(department)
    @department=department
    @user=user
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
        creator_id: @department.user_id
    }
  end
end

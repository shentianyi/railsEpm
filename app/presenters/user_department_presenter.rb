#encoding: utf-8
class UserDepartmentPresenter<Presenter
  Delegators=[:id, :department, :user, :is_manager, :created_at, :updated_at]
  def_delegators :@user_department, *Delegators

  def initialize(user_department)
    @user_department=user_department
    self.delegators =Delegators
  end


  def as_basic_feedback(messages=nil, result_code=nil)
    {
        result_code: result_code||0,
        messages: messages,
        need_instruction: false,
        customized_field: as_user_department
    }
  end

  def as_brief_info
    {
        id: @user_department.department.id,
        name: @user_department.department.name,
        description: @user_department.department.description,
        parent_id: @user_department.department.parent_id,
        has_children: @user_department.department.new_record? ? false : @user_department.department.has_children?
    }
  end

  def as_user_department
    {
        managable: @user_department.is_manager,
        department: as_brief_info
    }
  end

  def as_department_user
    {
        is_manager: @user_department.is_manager,
        user: UserPresenter.new(@user_department.user).as_brief_info
    }
  end

  def self.as_user_departments(uds)
    infos=[]
    uds.each do |ud|
      infos<<self.new(ud).as_user_department
    end
    infos
  end

  def self.as_department_users(uds)
    users=[]
    uds.each do |ud|
      users<<self.new(ud).as_department_user
    end
    users
  end
end
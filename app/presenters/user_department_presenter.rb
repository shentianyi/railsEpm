#encoding: utf-8
class UserDepartmentPresenter<Presenter
  Delegators=[:id, :department, :user, :is_manager, :created_at, :updated_at]
  def_delegators :@user_department, *Delegators

  def initialize(user_department)
    @user_department=user_department
    self.delegators =Delegators
  end


  def as_department_user
    {
        is_manager: @user_department.is_manager,
        user: UserPresenter.new(@user_department.user).as_brief_info(false)
    }
  end

  def self.as_department_users(uds)
    users=[]
    uds.each do |ud|
      users<<self.new(ud).as_department_user
    end
    users
  end
end
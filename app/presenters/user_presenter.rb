#encoding: utf-8
class UserPresenter<Presenter
  Delegators=[:id, :first_name, :last_name, :email, :role_id, :title,:tel,:phone,:is_tenant, :entity_id, :department_id,:role]
  def_delegators :@user,*Delegators

  def initialize(user)
    @user=user
    self.delegators =Delegators
  end

end
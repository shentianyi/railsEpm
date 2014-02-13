#encoding: utf-8
class UserPresenter<Presenter
  Delegators=[:id, :first_name, :last_name, :email, :role_id, :title, :entity_id, :entity_group_id,:role]
  def_delegators :@user,*Delegators

  def initialize(user)
    @user=user
    self.delegators =Delegators
  end

end
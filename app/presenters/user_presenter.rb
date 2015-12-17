#encoding: utf-8
class UserPresenter<Presenter
  Delegators=[:id, :first_name, :nick_name, :last_name, :email, :role_id, :title, :tel, :phone, :is_tenant, :entity_id, :department_id, :role]
  def_delegators :@user, *Delegators

  def initialize(user)
    @user=user
    self.delegators =Delegators
  end


  def as_basic_feedback(messages=nil, result_code=nil)
    if @user.nil?
      {
          result_code: result_code||0,
          messages: messages || [I18n.t('devise.failure.invalid')]
      }
    else
      {
          result_code: result_code||1,
          messages: messages || [I18n.t('devise.sessions.signed_in')],
          token: @user.access_token.token,
          need_instruction: false,
          customized_field: as_brief_info
      }
    end
  end

  def as_brief_info(with_dep=true)
    {
        id: @user.id,
        email: @user.email,
        nick_name: @user.nick_name,
        departments: with_dep ? DepartmentPresenter.as_user_departments(@user.root_departments,@user) : nil
    }
  end


  def as_basic_info
    {
        brief_user_info: as_brief_info
    }
  end

  def self.as_brief_infos(users,with_dep=true)
    infos=[]
    users.each do |user|
      infos<<UserPresenter.new(user).as_brief_info(with_dep)
    end
    infos
  end

end
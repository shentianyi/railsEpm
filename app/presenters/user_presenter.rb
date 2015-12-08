#encoding: utf-8
class UserPresenter<Presenter
  Delegators=[:id, :first_name, :nick_name, :last_name, :email, :role_id, :title, :tel, :phone, :is_tenant, :entity_id, :department_id, :role]
  def_delegators :@user, *Delegators

  def initialize(user)
    @user=user
    self.delegators =Delegators
  end


  def as_basic_feedback(messages=nil)
    if @user.nil?
      {
          result_code: 0,
          messages: messages || [I18n.t('devise.failure.invalid')]
      }
    else
      {
          result_code: 1,
          messages: messages || [I18n.t('devise.sessions.signed_in')],
          token: @user.access_token.token,
          need_instruction: false,
          customized_field: as_brief_user_info
      }
    end
  end

  def as_brief_user_info
    {
        id: @user.id,
        email: @user.email,
        nick_name: @user.nick_name,
        department: {
            id: 2,
            name: 'demo',
            description: 'not finish department yet',
            parent: 1,
            has_children: false
        }
    }
  end

  def as_basic_info
    {
        brief_user_info: as_brief_user_info
    }
  end

end
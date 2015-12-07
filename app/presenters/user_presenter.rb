#encoding: utf-8
class UserPresenter<Presenter
  Delegators=[:id, :first_name,:nick_name, :last_name, :email, :role_id, :title,:tel,:phone,:is_tenant, :entity_id, :department_id,:role]
  def_delegators :@user,*Delegators

  def initialize(user)
    @user=user
    self.delegators =Delegators
  end


  def as_session_json
    if @user.nil?
      {
          result_code: 0,
          messages: [I18n.t('devise.failure.invalid')]
      }
    else
      {
          result_code: 1,
          messages: [I18n.t('devise.sessions.signed_in')],
          token: @user.access_token.token,
          need_instruction: false,
          customized_field: as_brief_json
      }
    end
  end

  def as_brief_json
    {
        id: @user.id,
        email: @user.email,
        nick_name: @user.nick_name,
        department: 'MB'
    }
  end

  def as_sign_up_json
    if @user.persisted?
      {
          result_code:1,
          messages:['Sign Up Success']
      }
    else
      {
          result_code:0,
          messages: @user.errors.full_messages
      }
    end
  end
end
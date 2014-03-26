#encoding:utf-8
class UserRegistrationsController<Devise::RegistrationsController
  prepend_before_filter :require_no_authentication, :only => [:create]
  skip_authorize_resource

  def create
    msg=Message.new(result: true)
    build_resource(sign_up_params)
    if resource.save
      msg.object = UserPresenter.new(resource).to_json
    else
      clean_up_passwords resource
      msg.result =false
      msg.content = resource.errors.to_json
    end
    render json: msg
  end


  def update
    msg=Message.new
    @user=User.accessible_by(current_ability).find_by_id(params[:id])
    if params[:user][:password].blank?
      params[:user].except!(:password)
    else
      params[:user][:password_confirmation]=params[:user][:password]
    end
    if @user.update_attributes(params[:user])
      msg.result=true
      msg.object = UserPresenter.new(@user).to_json
    else
      msg.result=false
      msg.content=@user.errors
    end
    render :json => msg
  end

  protected

  def require_no_authentication
    if current_user && current_user.admin?
      return true
    else
      return super
    end
  end
end
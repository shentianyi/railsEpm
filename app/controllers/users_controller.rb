#encoding: utf-8
class UsersController < ApplicationController
  #skip_before_filter :authorize,:only=>:login
  #skip_before_filter :find_current_user_tenant,:only=>:login
  #skip_authorize_resource :only=>:login
  # before_filter :check_tenant_function

  # get ability entity
  before_filter :get_ability_entity,:only=>[:index,:new,:edit]
  before_filter :get_ability_user,:only=>[:edit,:update,:destroy]
  def index
    @active_entity_id=params[:p].nil? ? @entities[0].id : params[:p].to_i
    @users=User.accessible_by(current_ability).where(:entity_id=>@active_entity_id).all
  end

  def edit
    @user=User.accessible_by(current_ability).find_by_id(params[:id])
  end

  def update
    msg=Message.new 
    if @user.update_attributes(params[:user])
      msg.result=true
      temp = {}
      temp[:id] = @user.id
      temp[:first_name] = @user.first_name
      temp[:role] = UsersHelper.get_user_role_display(@user.role_id)
      temp[:role_id] = @user.role_id
      temp[:email] = @user.email
      msg.object = temp
    else
      msg.result=false
      msg.content=@user.errors
    end
    render :json=>msg
  end

  def new
    @user=User.new
  end

  def create
    @user=User.new(params[:user])

    msg=Message.new
    if  @user.save
      msg.result=true
      temp = {}
      temp[:id] = @user.id
      temp[:first_name] = @user.first_name
      temp[:role] = UsersHelper.get_user_role_display(@user.role_id)
      temp[:role_id] = @user.role_id
      temp[:email] = @user.email
      msg.object = temp.as_json
    else
      msg.result = false;
      msg.content=@user.errors
    end
    render :json=>msg
  end

  def destroy
    msg=Message.new
    if @user  and !@user.is_tenant
    msg.result=@user.destroy
    else
         msg.content=I18n.t "fix.cannot_destroy"
    end
    render :json=>msg
  end
  private

  def get_ability_entity
    @entities=Entity.accessible_by(current_ability).all
  end

  def get_ability_user
    @user=User.accessible_by(current_ability).find_by_id(params[:id])
  end
end

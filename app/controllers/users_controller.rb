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
    params[:user][:role_id]=400
    if @user and @user.update_attributes(params[:user])
      redirect_to users_path
    else
      flash[:notice]='error'
      render 'edit'
    end
  end

  def new
    @user=User.new
  end

  def create
    params[:user][:role_id]=400
    @user=User.new(params[:user])
    if  @user.save
      redirect_to users_path
    else
      get_ability_entity
      render 'new'
    end
  end

  def destroy
    msg=Message.new
    if @user  and !@user.is_tenant
    msg.result=@user.destroy
    else
      msg.content="用户不可删除"
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

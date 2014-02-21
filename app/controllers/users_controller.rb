#encoding: utf-8
class UsersController < ApplicationController
  before_filter :require_user_as_admin, :only => :index

  # get ability entity
  before_filter :get_ability_entity, :only => [:new, :edit]
  before_filter :get_ability_user, :only => [:edit, :update, :destroy]

  def index
    @roles=Role.role_items
    @active_role_id=params[:id].nil? ? @roles[0].id : params[:id].to_i
    @users= User.accessible_by(current_ability).by_role(@active_role_id).all
    @departments=Department.all
    @data_points=Entity.all
  end

  def edit
    @user=User.accessible_by(current_ability).find_by_id(params[:id])
  end

  def update
    msg=Message.new
    if @user.update_attributes(params[:user])
      msg.result=true
      msg.object = UserPresenter.new(@user).to_json
    else
      msg.result=false
      msg.content=@user.errors
    end
    render :json => msg
  end

  def new
    @user=User.new
  end

  def create
    @user=User.new(params[:user])
    msg=Message.new
    if  @user.save
      msg.result=true
      msg.object = UserPresenter.new(@user).to_json
    else
      msg.result = false
      msg.content=@user.errors
    end
    render :json => msg
  end

  def destroy
    msg=Message.new
    if @user and !@user.is_tenant
      msg.result=@user.destroy
    else
      msg.content=I18n.t "fix.cannot_destroy"
    end
    render :json => msg
  end

  private

  def get_ability_entity
    @entities=Entity.accessible_by(current_ability).all
  end

  def get_ability_user
    @user=User.accessible_by(current_ability).find_by_id(params[:id])
  end
end

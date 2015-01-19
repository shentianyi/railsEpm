#encoding: utf-8
class UsersController < ApplicationController
  before_filter :require_user_as_admin, :only => :index

  # get ability entity
  before_filter :get_ability_entity, :only => [:new, :edit]
  before_filter :get_ability_user, :only => [:edit, :destroy]

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


  def new
    @user=User.new
  end

  def destroy
    msg=Message.new
    msg.result = true
    if @user and !@user.is_tenant
      @user.destroy
    else
      msg.result = false
      msg.content=I18n.t "fix.cannot_destroy"
    end
    render :json => msg
  end

  def show
    @user = current_user
  end

  def applications
    @applications=current_user.oauth_applications
  end

  def list
    @users= User.accessible_by(current_ability).by_role(params[:id]).all
    render partial: 'list'
  end

  def fast_search
    items=[]
    Redis::Search.complete('User', params[:q], :conditions => {tenant_id: current_user_tenant.id, role_id: Role.director}).each do |item|
      unless item['id'].to_i==current_user.id
        items<<{id: item['id'], name: item['title'], email: item['email']}
      end
    end
    render json: items
  end


  def message
    render json: UserMessage.all(current_user.id)
  end

  private

  def get_ability_entity
    @entities=Entity.accessible_by(current_ability).all
  end

  def get_ability_user
    @user=User.accessible_by(current_ability).find_by_id(params[:id])
  end
end

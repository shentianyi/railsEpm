#encoding: utf-8
class UsersController < ApplicationController
  skip_before_filter :authorize,:only=>:login
  skip_before_filter :find_current_user_tenant,:only=>:login
  skip_authorize_resource :only=>:login
  
  # get ability entity
  before_filter :get_ability_entity,:only=>[:index,:new]
  def login
    # if request.post?

    # if user=User.authenticate(params[:email],params[:password])
    if user=User.first
      session[:user_id]=user.id
      render :json=>{:authed=>true}
    else
      render :json => {:authed=>false}
    end
  # end
  end

  def index
    @active_entity_id=params[:p].nil? ? @entities[0].id : params[:p].to_i
    @users=User.accessible_by(current_ability).where(:entity_id=>@active_entity_id).all
  end

  def new

  end

  def logout
  end

  def add
    if request.post?

    end
  end

  private

  def get_ability_entity
    @entities=Entity.accessible_by(current_ability).all
  end
end

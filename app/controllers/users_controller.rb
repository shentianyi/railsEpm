#encoding: utf-8
class UsersController < ApplicationController
  #skip_before_filter :authorize,:only=>:login
  #skip_before_filter :find_current_user_tenant,:only=>:login
  #skip_authorize_resource :only=>:login
  # before_filter :check_tenant_function

  # get ability entity
  before_filter :get_ability_entity,:only=>[:index,:new]



  def index
    @active_entity_id=params[:p].nil? ? @entities[0].id : params[:p].to_i
    @users=User.accessible_by(current_ability).where(:entity_id=>@active_entity_id).all
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

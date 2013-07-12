#encoding: utf-8
class EntityGroupsController < ApplicationController
  def create
   
  end

  def list
    current_user.entity_groups
    render :partial=>'list'
  end
end

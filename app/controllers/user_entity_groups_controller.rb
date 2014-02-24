#encoding: utf-8
class UserEntityGroupsController < ApplicationController
  def create
    msg=Message.new
    @user_entity_group=UserEntityGroup.new(params[:data])
    if @user_entity_group.save
      msg.result=true
      msg.object=@user_entity_group.id
    else
      msg.content=@user_entity_group.errors.messages.values.join('; ')
    end
    render :json => msg
  end


  # delete entity_group
  def destroy
    msg=Message.new
    if @user_entity_group=UserEntityGroup.accessible_by(current_ability).find_by_id(params[:id])
      if @user_entity_group.destroy
        msg.result=true
      else
        msg.content = I18n.t "fix.cannot_destroy"
      end
    else
      msg.content=I18n.t "fix.cannot_destroy"
    end
    render :json => msg
  end

  def get_entity_groups
    get_user_entity_groups
    respond_to do |t|
      t.json { render :json => @entity_groups }
    end
  end
end

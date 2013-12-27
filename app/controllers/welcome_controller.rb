class WelcomeController < ApplicationController
  skip_authorize_resource
  def navigate
  end

  def users
    msg = Message.new
    users = User.where("role_id = ?",100)
    managers = User.where("role_id = ?",200)
    directors = User.where("role_id = ?",300)
    admins = User.where("role_id = ?",400)

    #replace with presenter

    msg.result = true
    msg.content = {user:(users ? users.count : 0 ),manager:(managers ? managers.count : 0 ),directors:(directors ? directors.count : 0),admin:(admins ? admins.count : 0)}

    render :json=>msg
  end

  def statistics
    msg = Message.new
    msg.result = true
    kpis = current_user.kpis.count
    entities = Entity.all.count
    users = User.all.count
    views = current_user.entity_groups.count
    msg.content = {kpi:kpis,entity:entities,user:users,view:views}

    render :json=>msg
  end
end

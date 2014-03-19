class WelcomeController < ApplicationController
  skip_authorize_resource
  def navigate
  end

  def users
    msg = Message.new
    users = User.where("role_id = ?",100).count
    #managers = User.where("role_id = ?",200).count
    directors = User.where("role_id = ?",300).count
    admins = User.where("role_id = ?",400).count

    #replace with presenter

    msg.result = true
    msg.content = {user:users,director:directors ,admin:admins }

    render :json=>msg
  end

  def statistics
    msg = Message.new
    msg.result = true
    kpis = Kpi.count
    entities = Entity.count
    users = User.count
    views = EntityGroup.count
    msg.content = {kpi:kpis,entity:entities,user:users,view:views}

    render :json=>msg
  end
end

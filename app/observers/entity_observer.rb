#encoding: utf-8
class EntityObserver<ActiveRecord::Observer
  observe :entity

  def after_destroy entity
    entity.users.update_all(:entity_id=>nil)
  end
end

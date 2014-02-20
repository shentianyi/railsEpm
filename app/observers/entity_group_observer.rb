#encoding: utf-8
class EntityGroupObserver<ActiveRecord::Observer
  observe :entity_group

  def after_destroy entity_group
    #entity_group.users.update_all(:entity_group_id=>nil)
  end
end

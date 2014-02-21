#encoding: utf-8
class EntityGroupObserver<ActiveRecord::Observer
  observe :entity_group

  #def after_destroy entity_group
  #  #entity_group.users.update_all(:entity_group_id=>nil)
  #end

  def after_create entity_group
    ueg=entity_group.user_entity_groups.build
    ueg.user=entity_group.creator
    ueg.save
  end
end

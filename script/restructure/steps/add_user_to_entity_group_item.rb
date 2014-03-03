# user_id of entity_group_items is creator id
module AddUserToEntityGroupItem
  def self.execute
    EntityGroup.all.each do |ug|
      puts "add user to #{ug.name}'s entity_group_items...".yellow
      ug.entity_group_items.update_all(user_id: ug.user_id)
    end
  end
end
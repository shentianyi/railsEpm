module AutoShareEntityGroup
  def self.execute
    Department.all.each do |d|
      users = d.users
      d.subtree.each do |sub|
        users.each do |u|
          if sub.entity_group && u.id != sub.entity_group.id
            ueg = u.user_entity_groups.build
            ueg.entity_group = sub.entity_group
            ueg.save
          end
        end
      end
    end
  end
end
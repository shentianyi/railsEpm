module ReindexUserEntityGroup
  def self.execute
    EntityGroup.all.each do |eg|
      user=User.find(eg.user_id)
      print "redexing:#{user.first_name}'s #{eg.name}"
      unless user.user_entity_groups.where(entity_group_id: eg.id).first
        ueg=user.user_entity_groups.build
        ueg.entity_group=eg
        ueg.save
        print ' reindex success!'.yellow
      else
        print ' has been reindexed!'.red
      end
      puts '....'.yellow
    end
  end
end
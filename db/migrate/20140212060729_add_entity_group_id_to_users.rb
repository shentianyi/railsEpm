class AddEntityGroupIdToUsers < ActiveRecord::Migration
  def change
    add_column :users,:entity_group_id,:integer
  end
end

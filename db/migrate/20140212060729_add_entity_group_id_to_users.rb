class AddEntityGroupIdToUsers < ActiveRecord::Migration
  def change
    add_column :users,:entity_group_id,:integer
    add_index :users, :entity_group_id
  end
end

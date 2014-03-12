class AddUserIdToEntityGroupItems < ActiveRecord::Migration
  def change
    add_column :entity_group_items, :user_id, :integer
    add_index :entity_group_items, :user_id
  end
end

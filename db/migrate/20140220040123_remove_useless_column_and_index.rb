class RemoveUselessColumnAndIndex < ActiveRecord::Migration
  def change
    remove_column :entity_groups, :is_department
    remove_column :entity_groups, :ancestry

    remove_column :entity_group_items, :is_visual

    remove_index :users, :entity_group_id	
    remove_column :users, :entity_group_id
  end
end

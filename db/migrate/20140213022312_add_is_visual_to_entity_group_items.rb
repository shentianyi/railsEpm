class AddIsVisualToEntityGroupItems < ActiveRecord::Migration
  def change
    add_column :entity_group_items, :is_visual, :boolean, :default=>true
  end
end

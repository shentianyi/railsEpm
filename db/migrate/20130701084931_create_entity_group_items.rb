class CreateEntityGroupItems < ActiveRecord::Migration
  def change
    create_table :entity_group_items do |t|
      t.references :entity
      t.references :entity_group

      t.timestamps
    end
    add_index :entity_group_items, :entity_id
    add_index :entity_group_items, :entity_group_id
  end
end

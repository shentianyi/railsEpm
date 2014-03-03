class CreateUserEntityGroups < ActiveRecord::Migration
  def change
    create_table :user_entity_groups do |t|
      t.references :user
      t.references :entity_group

      t.timestamps
    end
    add_index :user_entity_groups, :user_id
    add_index :user_entity_groups, :entity_group_id
  end
end

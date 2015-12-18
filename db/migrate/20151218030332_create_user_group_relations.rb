class CreateUserGroupRelations < ActiveRecord::Migration
  def change
    create_table :user_group_relations do |t|
      t.references :user_group
      t.integer :user_groupable_id
      t.references :tenant
      t.string :user_groupable_type

      t.timestamps
    end
    add_index :user_group_relations, :user_group_id
    add_index :user_group_relations, :tenant_id
    add_index :user_group_relations, :user_groupable_id
    add_index :user_group_relations, :user_groupable_type
  end
end

class CreateUserGroupItems < ActiveRecord::Migration
  def change
    create_table :user_group_items do |t|
      t.references :user_group
      t.references :tenant
      t.integer :user_id

      t.timestamps
    end
    add_index :user_group_items, :user_group_id
    add_index :user_group_items, :tenant_id
  end
end

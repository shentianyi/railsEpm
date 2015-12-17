class CreateUserGroups < ActiveRecord::Migration
  def change
    create_table :user_groups do |t|
      t.references :user
      t.references :tenant
      t.string :name
      t.string :description

      t.timestamps
    end
    add_index :user_groups, :user_id
    add_index :user_groups, :tenant_id
  end
end

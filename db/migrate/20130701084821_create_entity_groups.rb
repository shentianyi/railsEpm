class CreateEntityGroups < ActiveRecord::Migration
  def change
    create_table :entity_groups do |t|
      t.string :name
      t.references :user
      t.references :tenant

      t.timestamps
    end
    add_index :entity_groups, :user_id
    add_index :entity_groups, :tenant_id
  end
end

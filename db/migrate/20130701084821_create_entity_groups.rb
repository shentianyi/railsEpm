class CreateEntityGroups < ActiveRecord::Migration
  def change
    create_table :entity_groups do |t|
      t.string :name
      t.references :user

      t.timestamps
    end
    add_index :entity_groups, :user_id
  end
end

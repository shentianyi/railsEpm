class CreateUserEntities < ActiveRecord::Migration
  def change
    create_table :user_entities do |t|
      t.references :user
      t.references :entity

      t.timestamps
    end
    add_index :user_entities, :user_id
    add_index :user_entities, :entity_id
  end
end

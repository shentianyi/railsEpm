class CreateEntities < ActiveRecord::Migration
  def change
    create_table :entities do |t|
      t.string :name
      t.integer :status
      t.integer :user_quantity
      t.references :tenant

      t.timestamps
    end
    add_index :entities, :tenant_id
  end
end

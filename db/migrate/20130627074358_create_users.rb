class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :role_id
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password
      t.string :salt
      t.string :remember_token
      t.datetime :remember_token_expires_at
      t.integer :status
      t.boolean :is_tenant,:default=>false
      t.references :tenant
      t.references :entity

      t.timestamps
    end
    add_index :users, :tenant_id
    add_index :users, :entity_id
  end
end

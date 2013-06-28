class CreateTenants < ActiveRecord::Migration
  def change
    create_table :tenants do |t|
      t.integer :edition_id
      t.integer :status
      t.string :company
      t.integer :user_quantity,:default=>1
      t.datetime :expires_at
      t.string :domain
      t.string :phone_number

      t.timestamps
    end
    add_index :tenants, :user_id
  end
end

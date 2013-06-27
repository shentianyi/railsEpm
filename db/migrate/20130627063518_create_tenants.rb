class CreateTenants < ActiveRecord::Migration
  def change
    create_table :tenants do |t|
      t.integer :edition_id
      t.integer :user_id
      t.integer :status
      t.string :company
      t.integer :user_quantity,:quantiy=>1
      t.datetime :expires_at
      t.string :domain
      t.string :phone_number

      t.timestamps
    end
  end
end

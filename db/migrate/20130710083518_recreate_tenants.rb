class RecreateTenants < ActiveRecord::Migration
  def change

    drop_table :tenants
    create_table :tenants do |t|
      #basic information
      t.string :company_name, :null=>false

      #subscription information
      t.string :edition,:null=>false
      t.string :subscription_reference
      t.string :expire_at,:null=>false
      t.integer :subscription_status,:null=>Subscription_status::TRIAL

      #payer information
      t.string :customer_first_name
      t.string :customer_last_name
      t.string :customer_email
      t.string :customer_phone

      t.references :user
      t.string :domain
      t.timestamps
    end
    add_index :tenants, :user_id
  end
end

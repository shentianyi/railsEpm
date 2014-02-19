class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :department
      t.string :tel
      t.string :phone
      t.string :email
      t.string :title
      t.references :tenant
      t.string :image_url

      t.timestamps
    end
    add_index :contacts, :tenant_id
  end
end

class CreateEntityContacts < ActiveRecord::Migration
  def change
    create_table :entity_contacts do |t|
      t.references :entity
      t.references :contact
      t.references :tenant

      t.timestamps
    end
    add_index :entity_contacts, :entity_id
    add_index :entity_contacts, :contact_id
    add_index :entity_contacts, :tenant_id
  end
end

class CreateEntityContacts < ActiveRecord::Migration
  def change
    create_table :entity_contacts do |t|
    # t.references :entity
      t.references :contactable, :polymorphic=>true
      t.references :contact
      t.references :tenant
      t.timestamps
    end
    add_index :entity_contacts, :contactable_id
    add_index :entity_contacts, :contactable_type
    add_index :entity_contacts, :contact_id
    add_index :entity_contacts, :tenant_id
  end
end

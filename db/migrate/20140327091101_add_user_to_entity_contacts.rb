class AddUserToEntityContacts < ActiveRecord::Migration
  def change
    add_column :entity_contacts, :user_id, :integer
    add_index :entity_contacts, :user_id
  end
end

class AddIndexToUsers < ActiveRecord::Migration
  def change
    add_index :users, :tenant_id
    add_index :users, :entity_id
  end
end

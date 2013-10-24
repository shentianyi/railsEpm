class AddAccessKeyToTenants < ActiveRecord::Migration
  def change
    add_column :tenants,:access_key,:string
  end
end

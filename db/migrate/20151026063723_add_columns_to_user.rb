class AddColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :stuff_id, :string, :null => true
    add_column :users, :current_project_id, :string, :default => ''
    add_column :users, :current_location, :string, :default => ''
    add_column :users, :device_id, :string, :default => ''
    add_column :users, :is_online, :boolean, :default => false
  end
end

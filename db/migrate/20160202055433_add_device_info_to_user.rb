class AddDeviceInfoToUser < ActiveRecord::Migration
  def change
    add_column :users, :device_token, :string
    add_column :users, :device_name, :string
    add_column :users, :device_version, :string
    add_column :users, :device_type, :string
  end
end

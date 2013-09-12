class AddIsSysToUsers < ActiveRecord::Migration
  def change
    add_column :users,:is_sys,:boolean,:default=>false
  end
end

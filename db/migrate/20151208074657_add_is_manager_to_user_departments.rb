class AddIsManagerToUserDepartments < ActiveRecord::Migration
  def change
    add_column :user_departments, :is_manager, :boolean, default: false
  end
end

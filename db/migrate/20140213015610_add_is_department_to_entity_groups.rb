class AddIsDepartmentToEntityGroups < ActiveRecord::Migration
  def change
    add_column :entity_groups, :is_department, :boolean ,:default=>false
  end
end

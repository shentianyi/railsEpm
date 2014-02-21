class AddDepartmentIdToEntityGroups < ActiveRecord::Migration
  def change
    add_column :entity_groups,:department_id,:integer
    add_index :entity_groups,:department_id
  end
end

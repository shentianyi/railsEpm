class AddDepartmentIdToEntities < ActiveRecord::Migration
  def change
    add_column :entities,:department_id,:integer
    add_index :entities,:department_id
  end
end

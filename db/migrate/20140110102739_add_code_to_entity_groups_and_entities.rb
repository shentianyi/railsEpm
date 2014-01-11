class AddCodeToEntityGroupsAndEntities < ActiveRecord::Migration
  def change
      add_column :entities,:code,:string
    add_column :entity_groups, :code, :string
  end
end

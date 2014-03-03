class AddAncestryToEntityGroup < ActiveRecord::Migration
  def change
    add_column :entity_groups, :ancestry, :string
  end
  def up
    add_index :entity_groups, :ancestry
  end

  def down
    remove_index :entity_groups, :ancestry
  end
end

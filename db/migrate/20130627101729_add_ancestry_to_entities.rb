class AddAncestryToEntities < ActiveRecord::Migration
  def up
    add_column :entities, :ancestry, :string
    add_index :entities,:ancestry
  end

  def down
    remove_index :entities,:ancestry
  end
end

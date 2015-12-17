class AddIsDefaultToEntities < ActiveRecord::Migration
  def change
    add_column :entities, :is_default, :boolean, default: false
    add_index :entities, :is_default
  end
end

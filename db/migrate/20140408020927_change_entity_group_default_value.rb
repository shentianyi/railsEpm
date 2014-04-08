class ChangeEntityGroupDefaultValue < ActiveRecord::Migration
  def up
    change_column :entity_groups,:code,:string,:default => ''
    change_column :entity_groups,:description,:string,:default => ''
  end

  def down
  end
end

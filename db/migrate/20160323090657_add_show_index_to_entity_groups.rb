class AddShowIndexToEntityGroups < ActiveRecord::Migration
  def change
    add_column :entity_groups, :show_index, :integer, default: 10
  end
end

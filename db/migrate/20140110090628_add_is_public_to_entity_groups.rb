class AddIsPublicToEntityGroups < ActiveRecord::Migration
  def change
    add_column :entity_groups, :is_public, :boolean, default: false
    add_column :entity_groups, :description, :string
  end
end

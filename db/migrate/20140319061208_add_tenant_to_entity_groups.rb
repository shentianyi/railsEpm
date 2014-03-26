class AddTenantToEntityGroups < ActiveRecord::Migration
  def change
    add_column :entity_groups, :tenant_id, :integer
    add_index :entity_groups, :tenant_id
    EntityGroup.all.each{|eg| eg.update_attributes(tenant_id:eg.creator.tenant_id)}
  end
end

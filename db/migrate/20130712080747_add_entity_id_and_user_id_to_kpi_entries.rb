class AddEntityIdAndUserIdToKpiEntries < ActiveRecord::Migration
  def change
    add_column :kpi_entries,:user_id,:integer
    add_column :kpi_entries,:entity_id,:integer
    add_index :kpi_entries, :user_id
    add_index :kpi_entries, :entity_id
  end
end

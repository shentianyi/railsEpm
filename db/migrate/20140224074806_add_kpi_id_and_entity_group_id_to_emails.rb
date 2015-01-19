class AddKpiIdAndEntityGroupIdToEmails < ActiveRecord::Migration
  def change
    add_column :emails, :kpi_id, :integer
    add_column :emails, :entity_group_id, :integer
    add_index :emails, :kpi_id
    add_index :emails, :entity_group_id
  end
end

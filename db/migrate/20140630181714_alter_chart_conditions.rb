class AlterChartConditions < ActiveRecord::Migration
  def change
    change_column :chart_conditions, :entity_group, :integer
    change_column :chart_conditions, :kpi_id, :integer
    rename_column :chart_conditions, :entity_group, :entity_group_id
    add_index :chart_conditions, :entity_group_id
  end
end

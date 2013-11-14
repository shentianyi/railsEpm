class SetTargetMinDefaultValOfAllTables < ActiveRecord::Migration
  def up
  end

  def down
  end

  def change
    change_column :kpis, :target_min, :float, :default => 0
    change_column :user_kpi_items, :target_min, :float ,:default => 0
    change_column :kpi_entries, :target_min, :float, :default => 0
  end
end

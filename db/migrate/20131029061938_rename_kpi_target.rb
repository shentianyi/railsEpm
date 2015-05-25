class RenameKpiTarget < ActiveRecord::Migration
  def up
  end

  def down
  end

  def change
    rename_column :user_kpi_items, :target ,:target_max
    add_column :user_kpi_items, :target_min ,:float

    rename_column :kpi_entries, :target, :target_max
    add_column :kpi_entries, :target_min, :float
  end
end

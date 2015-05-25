class AddTargetToKpiEntries < ActiveRecord::Migration
  def change
    add_column :kpi_entries,:target,:float
  end
end

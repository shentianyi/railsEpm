class AddIntervalToDashboardItem < ActiveRecord::Migration
  def change
    add_column :dashboard_items,:interval,:integer
  end
end

class AddRowAndColAndSizexAndSizeyToDashboardItems < ActiveRecord::Migration
  def change
    add_column :dashboard_items, :row, :integer
    add_column :dashboard_items, :col, :integer
    add_column :dashboard_items, :sizex, :integer
    add_column :dashboard_items, :sizey, :integer
  end
end

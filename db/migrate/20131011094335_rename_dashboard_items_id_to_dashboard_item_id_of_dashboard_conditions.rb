class RenameDashboardItemsIdToDashboardItemIdOfDashboardConditions < ActiveRecord::Migration
  def up
  end

  def down
  end
  def change
    rename_column :dashboard_conditions,:dashboard_items_id,:dashboard_item_id
  end
end

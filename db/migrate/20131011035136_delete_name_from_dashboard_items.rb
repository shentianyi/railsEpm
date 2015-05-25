class DeleteNameFromDashboardItems < ActiveRecord::Migration
  def up
  end

  def down
  end

  def change
    remove_column :dashboard_items, :name
  end
end

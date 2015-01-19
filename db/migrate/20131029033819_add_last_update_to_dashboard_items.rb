class AddLastUpdateToDashboardItems < ActiveRecord::Migration
  def change
    add_column :dashboard_items, :last_update, :string
  end
end

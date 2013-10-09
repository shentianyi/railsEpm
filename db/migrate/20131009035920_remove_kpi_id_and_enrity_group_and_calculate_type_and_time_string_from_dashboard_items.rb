class RemoveKpiIdAndEnrityGroupAndCalculateTypeAndTimeStringFromDashboardItems < ActiveRecord::Migration
  def change
    remove_column :dashboard_items, :entity_group
    remove_column :dashboard_items, :kpi_id
    remove_column :dashboard_items, :calculate_type
    remove_column :dashboard_items, :time_string
  end
end

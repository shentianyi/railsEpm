class RenameCaltypeToChartTypeOfDashboardItems < ActiveRecord::Migration
  def change
    rename_column :dashboard_items,:caltype,:chart_type
  end
end

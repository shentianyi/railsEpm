class AddKpiPropertyToDashboardConditions < ActiveRecord::Migration
  def change
    add_column :dashboard_conditions, :kpi_property, :text
  end
end

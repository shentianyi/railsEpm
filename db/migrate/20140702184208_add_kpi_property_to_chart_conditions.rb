class AddKpiPropertyToChartConditions < ActiveRecord::Migration
  def change
    add_column :chart_conditions, :kpi_property, :string
  end
end

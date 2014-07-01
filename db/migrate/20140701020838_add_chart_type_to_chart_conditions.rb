class AddChartTypeToChartConditions < ActiveRecord::Migration
  def change
    add_column :chart_conditions, :chart_type, :string
  end
end

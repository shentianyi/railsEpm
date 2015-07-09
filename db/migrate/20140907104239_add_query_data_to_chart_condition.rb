class AddQueryDataToChartCondition < ActiveRecord::Migration
  def change
    add_column :chart_conditions, :query, :text
    add_column :chart_conditions, :data, :text
  end
end

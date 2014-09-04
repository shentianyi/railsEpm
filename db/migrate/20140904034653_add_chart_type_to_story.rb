class AddChartTypeToStory < ActiveRecord::Migration
  def change
    add_column :stories,:chart_type,:integer, default: 0
  end
end

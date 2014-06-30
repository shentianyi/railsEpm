class CreateChartConditions < ActiveRecord::Migration
  def change
    create_table :chart_conditions do |t|
      t.string :entity_group
      t.string :kpi_id
      t.string :calculate_type
      t.string :time_string
      t.integer :chartable_id
      t.string :chartable_type
      t.timestamps
    end
    add_index :chart_conditions, :kpi_id
  end
end

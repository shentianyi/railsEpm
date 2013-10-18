class CreateDashboardConditions < ActiveRecord::Migration
  def change
    create_table :dashboard_conditions do |t|
      t.belongs_to :dashboard_items
      t.string :entity_group,:null=>false
      t.string :kpi_id,:null=>false
      t.string :calculate_type,:null=>false
      t.string :time_string,:null=>false
      t.timestamps
    end
  end
end

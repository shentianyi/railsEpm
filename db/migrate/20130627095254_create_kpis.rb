class CreateKpis < ActiveRecord::Migration
  def change
    create_table :kpis do |t|
      t.string :name
      t.string :description
      t.references :kpi_category
      t.integer :unit
      t.integer :entry_frequency
      t.float :target
      t.boolean :is_calculated
      t.integer :desired_direction
      t.integer :kpi_period
      t.string :formula
      t.timestamps
    end
    add_index :kpis, :kpi_category_id
  end
end

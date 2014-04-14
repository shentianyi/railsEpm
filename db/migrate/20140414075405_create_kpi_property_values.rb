class CreateKpiPropertyValues < ActiveRecord::Migration
  def change
    create_table :kpi_property_values do |t|
      t.references :kpi_property
      t.references :kpi
      t.string     :value
      t.integer    :count
      t.timestamps
    end
    add_index :kpi_property_values, :kpi_property_id
    add_index :kpi_property_values, :kpi_id
  end
end

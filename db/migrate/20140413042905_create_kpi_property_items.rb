class CreateKpiPropertyItems < ActiveRecord::Migration
  def change
    create_table :kpi_property_items do |t|
      t.references :kpi
      t.references :kpi_property
      t.timestamps
    end
    add_index :kpi_property_items,:kpi_id
    add_index :kpi_property_items,:kpi_property_id
  end
end

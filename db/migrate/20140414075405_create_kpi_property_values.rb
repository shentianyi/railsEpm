class CreateKpiPropertyValues < ActiveRecord::Migration
  def change
    create_table :kpi_property_values do |t|
      t.references :kpi_property_item
      t.string     :value
      t.integer    :count
      t.timestamps
    end
    add_index :kpi_property_values, :kpi_property_item_id
  end
end

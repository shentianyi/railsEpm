class CreateKpiItems < ActiveRecord::Migration
  def change
    create_table :kpi_items do |t|
      t.integer :item_id
      t.references :kpi

      t.timestamps
    end
    add_index :kpi_items, :kpi_id
    add_index :kpi_items, :item_id
  end
end

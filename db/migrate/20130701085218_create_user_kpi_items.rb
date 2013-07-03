class CreateUserKpiItems < ActiveRecord::Migration
  def change
    create_table :user_kpi_items do |t|
      t.references :entity
      t.references :user
      t.references :kpi
      t.float :target
      t.timestamps
    end
    add_index :user_kpi_items, :entity_id
    add_index :user_kpi_items, :user_id
    add_index :user_kpi_items, :kpi_id
  end
end

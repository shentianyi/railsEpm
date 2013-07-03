class CreateKpiEntries < ActiveRecord::Migration
  def change
    create_table :kpi_entries do |t|
      t.datetime :entry_at
      t.integer :entry_frequency
      t.float :value
      t.float :original_value
      t.references :user_kpi_item

      t.timestamps
    end
    add_index :kpi_entries, :user_kpi_item_id
    add_index :kpi_entries, :entry_at
    
  end
end

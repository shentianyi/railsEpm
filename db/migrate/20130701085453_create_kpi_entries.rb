class CreateKpiEntries < ActiveRecord::Migration
  def change
    create_table :kpi_entries do |t|
      t.string :entry_at
      t.integer :entry_frequency
      t.float :value
      t.float :original_value
      t.datetime :parsed_entry_at
      t.references :user_kpi_item
      t.integer :kpi_id
      t.timestamps
    end
    add_index :kpi_entries, :user_kpi_item_id
    add_index :kpi_entries, :entry_at
    add_index :kpi_entries, :parsed_entry_at 
  end
end

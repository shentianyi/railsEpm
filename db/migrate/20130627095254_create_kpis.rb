class CreateKpis < ActiveRecord::Migration
  def change
    create_table :kpis do |t|
      t.string :name
      t.string :description
      t.references :kpi_category
      t.integer :unit
      t.integer :frequency
      t.float :target
      t.boolean :is_calculated,:default=>false
      t.integer :direction
      t.integer :period
      t.string :formula
     # t.string :parsed_formula
      t.references :user
      t.references :tenant
      t.timestamps
    end
    add_index :kpis, :kpi_category_id
    add_index :kpis,:user_id
    add_index :kpis,:tenant_id
  end
end

#encoding: utf-8
class CreateKpiCategories < ActiveRecord::Migration
  def change
    create_table :kpi_categories do |t|
      t.string :name,:default=>'Default'
      t.integer :kpi_quantity,:default=>0
      t.string :description
      t.references :tenant

      t.timestamps
    end
    add_index :kpi_categories, :tenant_id
  end
end

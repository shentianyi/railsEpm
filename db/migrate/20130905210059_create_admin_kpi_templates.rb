class CreateAdminKpiTemplates < ActiveRecord::Migration
  def change
    create_table :admin_kpi_templates do |t|
      t.string :description
      t.string :name
      t.integer :unit
      t.integer :frequency
      t.float :target
      t.boolean :is_calculated,:default=>false
      t.integer :direction
      t.integer :period
      t.string :formula
      t.string :formula_string
      t.references :admin_kpi_category_template

      t.timestamps
    end
    add_index :admin_kpi_templates, :admin_kpi_category_template_id
  end
end

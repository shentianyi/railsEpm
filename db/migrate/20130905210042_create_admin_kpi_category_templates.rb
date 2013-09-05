class CreateAdminKpiCategoryTemplates < ActiveRecord::Migration
  def change
    create_table :admin_kpi_category_templates do |t|
      t.string :name
      t.string :description
      t.integer :kpi_quantity

      t.timestamps
    end
  end
end

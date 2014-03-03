class CreateDepartmentKpis < ActiveRecord::Migration
  def change
    create_table :department_kpis do |t|
      t.references :department
      t.references :kpi
      t.integer :kpi_quantity, default: 1

      t.timestamps
    end
    add_index :department_kpis, :department_id
    add_index :department_kpis, :kpi_id
  end
end

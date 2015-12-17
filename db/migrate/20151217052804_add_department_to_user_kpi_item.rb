class AddDepartmentToUserKpiItem < ActiveRecord::Migration
  def change
    add_column :user_kpi_items, :department_id, :integer
  end
end

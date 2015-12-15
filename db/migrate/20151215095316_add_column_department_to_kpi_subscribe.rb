class AddColumnDepartmentToKpiSubscribe < ActiveRecord::Migration
  def change
    add_column :kpi_subscribes, :department_id, :integer
  end
end

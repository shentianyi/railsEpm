class AddDepartmentIdToKpiUserSubscribes < ActiveRecord::Migration
  def change
    add_column :kpi_user_subscribes, :department_id, :integer
    add_index :kpi_user_subscribes, :department_id
  end
end

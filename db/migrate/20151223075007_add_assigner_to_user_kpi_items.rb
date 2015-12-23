class AddAssignerToUserKpiItems < ActiveRecord::Migration
  def change
    add_column :user_kpi_items, :assigner, :integer
  end
end

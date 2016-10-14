class AddXGroupToDashboardConditions < ActiveRecord::Migration
  def change
    add_column :dashboard_conditions, :x_group, :string
  end
end

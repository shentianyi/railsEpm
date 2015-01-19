class AddCountToDashboardConditions < ActiveRecord::Migration
  def change
    add_column :dashboard_conditions, :count, :integer
  end
end

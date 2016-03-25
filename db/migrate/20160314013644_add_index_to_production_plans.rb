class AddIndexToProductionPlans < ActiveRecord::Migration
  def change
    add_column :production_plans, :index, :integer
  end
end

class AddRemarkToProductionPlans < ActiveRecord::Migration
  def change
    add_column :production_plans, :remark, :string
  end
end

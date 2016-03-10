class AddIsConfirmedToProductionPlans < ActiveRecord::Migration
  def change
    add_column :production_plans, :is_confirmed, :boolean,default: false
  end
end

class AddMinMaxToProductionPlans < ActiveRecord::Migration
  def change
    add_column :production_plans, :trigger_min, :integer,default: 0
    add_column :production_plans, :trigger_max, :integer,default:0
  end
end

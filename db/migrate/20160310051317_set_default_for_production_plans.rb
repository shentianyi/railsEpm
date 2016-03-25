class SetDefaultForProductionPlans < ActiveRecord::Migration
  def up
    change_column_default :production_plans,:produced,0
  end

  def down
  end
end

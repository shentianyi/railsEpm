class ChangeAssignerAndAssignorId < ActiveRecord::Migration
  def up
    rename_column :user_kpi_items, :assigner, :assigner_id
    rename_column :task_items, :assignor_id, :assigner_id
  end

  def down
  end
end

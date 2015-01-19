class RenameTargetToTargetMaxAddTargetMinToKpis < ActiveRecord::Migration
  def up
  end

  def down
  end

  def change
    rename_column :kpis,:target,:target_max
    add_column :kpis,:target_min,:float,:default=>0
  end
end

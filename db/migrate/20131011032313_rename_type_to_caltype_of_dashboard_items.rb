class RenameTypeToCaltypeOfDashboardItems < ActiveRecord::Migration
  def change
    rename_column :dashboard_items,:type,:caltype
  end
end

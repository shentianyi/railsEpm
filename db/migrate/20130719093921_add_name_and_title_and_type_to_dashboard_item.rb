class AddNameAndTitleAndTypeToDashboardItem < ActiveRecord::Migration
  def change
    add_column :dashboard_items,:name,:string
    add_column :dashboard_items,:title,:string
    add_column :dashboard_items,:type,:string
  end
end

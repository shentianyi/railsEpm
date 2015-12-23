class AddAutoNotificationToUserKpiItems < ActiveRecord::Migration
  def change
    add_column :user_kpi_items, :auto_notification, :boolean,default: false
  end
end

class AddColumnAutoNotificationToKpiSubscribe < ActiveRecord::Migration
  def change
    add_column :kpi_subscribes, :auto_notification, :boolean, :default => false
  end
end

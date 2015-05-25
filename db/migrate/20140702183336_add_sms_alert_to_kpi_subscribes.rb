class AddSmsAlertToKpiSubscribes < ActiveRecord::Migration
  def change
    add_column :kpi_subscribes, :alert_by_sms, :boolean, :default => false
    add_column :kpi_subscribes, :alert_by_email, :boolean, :default => false
  end
end

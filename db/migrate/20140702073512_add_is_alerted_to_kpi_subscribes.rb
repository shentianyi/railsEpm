class AddIsAlertedToKpiSubscribes < ActiveRecord::Migration
  def change
    add_column :kpi_subscribes, :is_alert, :boolean, :default => false
  end
end

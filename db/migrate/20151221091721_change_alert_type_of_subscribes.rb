class ChangeAlertTypeOfSubscribes < ActiveRecord::Migration
  def up
    change_column :kpi_subscribe_alerts,:alert_type,:integer
  end

  def down
    change_column :kpi_subscribe_alerts,:alert_type,:string
  end
end
